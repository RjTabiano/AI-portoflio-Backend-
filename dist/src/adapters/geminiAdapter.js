"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageToGemini = sendMessageToGemini;
// src/adapters/geminiAdapter.ts
const generative_ai_1 = require("@google/generative-ai");
const index_js_1 = require("../config/index.js");
const system_prompts_js_1 = require("../prompts/system-prompts.js");
const genAI = new generative_ai_1.GoogleGenerativeAI(index_js_1.ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(index_js_1.MODEL_CONFIG);
// Function definitions for tool calls - using Gemini's format
const functionDefinitions = [
    {
        name: 'getContact',
        description: 'This tool show my contact informations.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getResume',
        description: 'This tool shows my resume and professional experience.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getPresentation',
        description: 'This tool shows my detailed background and personal information.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getSkills',
        description: 'This tool shows my technical skills and competencies.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getSport',
        description: 'This tool shows my sports activities and fitness information.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getCrazy',
        description: 'This tool will the craziest thing Ive ever done. use it when the user ask someting like : What the craziest thing youve ever done?',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getInternship',
        description: 'This tool shows my internship experience and achievements.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    },
    {
        name: 'getProjects',
        description: 'This tool shows my projects and achievements.',
        parameters: {
            type: generative_ai_1.SchemaType.OBJECT,
            properties: {},
            required: []
        }
    }
];
async function sendMessageToGemini(_chat, message) {
    try {
        console.log('🔍 Sending message to Gemini (generateContent):', message);
        // Compose contents: system prompt + user message
        const contents = [
            { role: 'user', parts: [{ text: system_prompts_js_1.SYSTEM_PROMPT }] },
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
        let tool_call = undefined;
        if (functionCalls && functionCalls.length > 0 && functionCalls[0]) {
            tool_call = functionCalls[0].name;
        }
        const finalResponse = tool_call
            ? { response: responseText, tool_call, timestamp: new Date() }
            : { response: responseText, timestamp: new Date() };
        console.log('📤 Final response:', finalResponse);
        return finalResponse;
    }
    catch (error) {
        console.error('❌ Error in sendMessageToGemini:', error);
        throw error;
    }
}
//# sourceMappingURL=geminiAdapter.js.map