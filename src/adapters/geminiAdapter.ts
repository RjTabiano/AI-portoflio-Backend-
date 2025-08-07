// src/adapters/geminiAdapter.ts
import { GoogleGenerativeAI, GenerativeModel, FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { MODEL_CONFIG, ENV } from '../config/index.js';
import type { ChatMessage, FunctionDefinition, ChatResponse } from '../types/gemini.js';
import { SYSTEM_PROMPT } from '../prompts/system-prompts.js';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model: GenerativeModel = genAI.getGenerativeModel(MODEL_CONFIG);

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
    const result = await model.generateContent({
      contents,
      tools: [{ functionDeclarations: functionDefinitions }]
    });
    const response = result.response;
    const responseText = response.text();
    console.log('📝 Raw Gemini response:', responseText);
    // Check for function calls
    const functionCalls = response.functionCalls();
    console.log('🔧 Function calls found:', functionCalls);
    let tool_call: string | undefined = undefined;
    if (functionCalls && functionCalls.length > 0 && functionCalls[0]) {
      tool_call = functionCalls[0].name;
    }
    const finalResponse: ChatResponse = tool_call
      ? { response: responseText, tool_call, timestamp: new Date() }
      : { response: responseText, timestamp: new Date() };
    console.log('📤 Final response:', finalResponse);
    return finalResponse;
  } catch (error) {
    console.error('❌ Error in sendMessageToGemini:', error);
    throw error;
  }
} 