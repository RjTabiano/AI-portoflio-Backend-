// src/services/chatService.ts
import { sendMessageToGemini } from '../adapters/geminiAdapter.js';
import type { ChatMessage, ChatResponse } from '../types/gemini.js';

export async function getGeminiReply(messages: ChatMessage[]): Promise<ChatResponse> {
  // Get the last user message
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    throw new Error('Last message must be from user');
  }
  // Send the message and get response
  const result = await sendMessageToGemini(null, lastMessage.content);
  return result;
}

