import type { ChatResponse } from '../types/gemini.js';
export declare function startChat(): import("@google/generative-ai").ChatSession;
export declare function sendMessageToGemini(chat: ReturnType<typeof startChat>, message: string): Promise<ChatResponse>;
//# sourceMappingURL=geminiAdapter.d.ts.map