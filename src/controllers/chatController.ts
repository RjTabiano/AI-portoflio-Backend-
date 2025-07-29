// src/controllers/chatController.ts
import type { Request, Response } from 'express';
import { getGeminiReply } from '../services/chatService.js';
import type { ChatRequest, ChatResponse, ApiResponse } from '../types/gemini.js';

export const sendChat = async (req: Request<{}, {}, ChatRequest>, res: Response<ChatResponse | ApiResponse>): Promise<void> => {
  try {
    console.log('📨 Received chat request:', req.body);
    
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('❌ Invalid messages array');
      res.status(400).json({ success: false, error: 'Messages array is required' });
      return;
    }
    
    console.log('🔄 Calling getGeminiReply...');
    const result = await getGeminiReply(messages);
    console.log('📤 Gemini reply result:', result);
    
    console.log('📤 Sending response to client:', result);
    res.json(result);
  } catch (error) {
    console.error('❌ Error in sendChat:', error);
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
