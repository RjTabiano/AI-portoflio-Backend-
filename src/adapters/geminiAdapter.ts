// src/adapters/geminiAdapter.ts
import { GoogleGenerativeAI, GenerativeModel, FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { MODEL_CONFIG, FALLBACK_MODELS, ENV } from '../config/index.js';
import type { ChatResponse } from '../types/gemini.js';
import { SYSTEM_PROMPT } from '../prompts/system-prompts.js';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

const modelChain: GenerativeModel[] = [
  genAI.getGenerativeModel(MODEL_CONFIG),
  ...FALLBACK_MODELS.map(m => genAI.getGenerativeModel({ ...MODEL_CONFIG, model: m })),
];

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateWithFallback(
  request: Parameters<GenerativeModel['generateContent']>[0]
): ReturnType<GenerativeModel['generateContent']> {
  let lastError: unknown;

  for (const model of modelChain) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        return await model.generateContent(request);
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        const shouldFallback = status === 404;
        const retryable = status === 503 || status === 429;
        if (!retryable && !shouldFallback) throw err;
        if (shouldFallback) break;
        lastError = err;
        if (attempt < 3) {
          const delay = Math.pow(2, attempt - 1) * 1000;
          console.warn(`⚠️ ${(model as unknown as { model: string }).model} attempt ${attempt}/3 (${status}), retrying in ${delay}ms...`);
          await sleep(delay);
        } else {
          console.warn(`⚠️ ${(model as unknown as { model: string }).model} exhausted retries, trying next model...`);
        }
      }
    }
  }

  throw lastError;
}

// Function definitions for tool calls - using Gemini's format
const functionDefinitions: FunctionDeclaration[] = [
  {
    name: 'getContact',
    description: 'This tool show my contact informations.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
      required: []
    }
  },
  {
    name: 'getResume',
    description: 'This tool shows my resume and professional experience.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
      required: []
    }
  },
  {
    name: 'getPresentation',
    description: 'This tool shows my detailed background and personal information.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
      required: []
    }
  },
  {
    name: 'getSkills',
    description: 'This tool shows my technical skills and competencies.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
      required: []
    }
  },
  {
    name: 'getProjects',
    description: 'This tool shows my projects and achievements.',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {},
      required: []
    }
  }
];

export async function sendMessageToGemini(_chat: null, message: string): Promise<ChatResponse> {
  try {
    console.log('🔍 Sending message to Gemini (generateContent):', message);

    // Compose contents: system prompt + user message
    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'user', parts: [{ text: message }] }
    ];

    // Call Gemini with function calling config
    const result = await generateWithFallback({
      contents,
      tools: [{ functionDeclarations: functionDefinitions }]
    });

    const response = result.response;
    // Check for function calls first
    const functionCalls = response.functionCalls();
    console.log('🔧 Function calls found:', functionCalls);

    let finalResponse: ChatResponse;

    if (functionCalls && functionCalls.length > 0 && functionCalls[0]) {
      // If a tool call is present, still include a short follow-up text per SYSTEM_PROMPT rules
      const tool_call = functionCalls[0].name;

      // Try to use model-provided text; if empty, dynamically ask for a follow-up without tools
      let responseText = (response.text() || '').trim();

      if (responseText.length === 0) {
        try {
          const followUp = await generateWithFallback({
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
              {
                role: 'user',
                parts: [{
                  text:
                    `User said: "${message}"\n` +
                    `You selected tool "${tool_call}".\n` +
                    `Per the rules, reply in first-person as Rj with a short, engaging 1-3 sentence follow-up to keep the conversation going. ` +
                    `Do not call any tools in this turn.`
                }]
              }
            ]
          });
          responseText = (followUp.response.text() || '').trim();
        } catch (err) {
          console.warn('⚠️ Secondary follow-up generation failed, will use fallback.', err);
        }
      }

     
      console.log('📤 Final response (tool + text):', { tool_call, responseText, timestamp: new Date() });
      finalResponse = { response: responseText, tool_call, timestamp: new Date() };
    } else {
      // If no tool call, get the text response and set tool_call to null
      const responseText = response.text();
      console.log('📝 Raw Gemini response:', responseText);
      console.log('📤 Final response (text):', { response: responseText, timestamp: new Date() });
      finalResponse = { response: responseText, tool_call: null, timestamp: new Date() };
    }

    return finalResponse;
  } catch (error) {
    console.error('❌ Error in sendMessageToGemini:', error);
    throw error;
  }
}