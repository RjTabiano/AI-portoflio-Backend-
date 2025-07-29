// src/adapters/geminiAdapter.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MODEL_CONFIG, ENV } from '../config/index.js';
import { SYSTEM_PROMPT } from '../prompts/system-prompts.js';
import * as tools from '../tools/index.js';
const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model = genAI.getGenerativeModel(MODEL_CONFIG);
// Function definitions for tool calls - using Gemini's format
const functionDefinitions = [
    {
        name: 'getContact',
        description: 'Get contact information',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getResume',
        description: 'Get resume and professional experience',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getPresentation',
        description: 'Get detailed background and personal information',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getSkills',
        description: 'Get technical skills and competencies',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getSport',
        description: 'Get sports activities and fitness information',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getCrazy',
        description: 'Get the craziest thing about RJ',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getInternship',
        description: 'Get internship experience and achievements',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    {
        name: 'getProjects',
        description: 'Get projects and achievements',
        parameters: {
            type: 'object',
            properties: {},
            required: []
        }
    }
];
export function startChat() {
    return model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: SYSTEM_PROMPT }],
            },
            {
                role: 'model',
                parts: [{ text: "Hi! I'm RJ Tabiano, a Software Developer and Full Stack Engineer from the Philippines. I'm excited to help you and share my experiences with technology and development. What would you like to know about my work, projects, or how I can assist you?" }],
            },
        ],
    });
}
export async function sendMessageToGemini(chat, message) {
    try {
        console.log('🔍 Sending message to Gemini:', message);
        // Send message
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const responseText = response.text();
        console.log('📝 Raw Gemini response:', responseText);
        // Check if the response contains function calls
        const functionCalls = response.functionCalls();
        console.log('🔧 Function calls found:', functionCalls);
        if (functionCalls && functionCalls.length > 0) {
            console.log('⚙️ Processing function calls...');
            // Process each function call
            for (const functionCall of functionCalls) {
                const toolName = functionCall.name;
                console.log('🛠️ Function call name:', toolName);
                // Check if the tool exists in our tools
                if (toolName in tools) {
                    console.log('✅ Tool found:', toolName);
                    // @ts-ignore
                    const tool = tools[toolName];
                    if (tool && typeof tool.execute === 'function') {
                        console.log('🚀 Executing tool:', toolName);
                        // Execute the tool
                        const toolResult = await tool.execute();
                        console.log('📊 Tool result:', toolResult);
                        const finalResponse = {
                            response: responseText,
                            tool_call: toolName,
                            timestamp: new Date()
                        };
                        console.log('📤 Final response with tool call:', finalResponse);
                        return finalResponse;
                    }
                }
                else {
                    console.log('❌ Tool not found:', toolName);
                }
            }
        }
        else {
            console.log('📝 No function calls, returning regular response');
        }
        // If no function calls or no matching tool call, return regular response
        const regularResponse = {
            response: responseText,
            timestamp: new Date()
        };
        console.log('📤 Regular response:', regularResponse);
        return regularResponse;
    }
    catch (error) {
        console.error('❌ Error in sendMessageToGemini:', error);
        throw error;
    }
}
//# sourceMappingURL=geminiAdapter.js.map