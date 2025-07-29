// config/index.ts
import dotenv from 'dotenv';
import { HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
dotenv.config();
export const ENV = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '5000', 10),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
};
// Safety settings for Gemini AI
export const SAFETY_SETTINGS = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    }
];
// Generation configuration for Gemini AI
export const GENERATION_CONFIG = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
};
// Model configuration
export const MODEL_CONFIG = {
    model: "gemini-1.5-flash",
    safetySettings: SAFETY_SETTINGS,
    generationConfig: GENERATION_CONFIG,
};
export const CORS_CONFIG = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200,
};
export const RATE_LIMIT_CONFIG = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
};
// Validation
export const validateConfig = () => {
    const requiredEnvVars = ['GEMINI_API_KEY'];
    const missing = requiredEnvVars.filter(varName => !ENV[varName]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};
//# sourceMappingURL=index.js.map