import type { Request, Response } from 'express';
import type { ChatRequest, ChatResponse, ApiResponse } from '../types/gemini.js';
export declare const sendChat: (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse | ApiResponse>) => Promise<void>;
//# sourceMappingURL=chatController.d.ts.map