// src/services/chatService.ts
import { startChat, sendMessageToGemini } from '../adapters/geminiAdapter.js';
export async function getGeminiReply(messages) {
    console.log('🎯 getGeminiReply called with messages:', messages);
    // Start a new chat session
    const chat = startChat();
    console.log('💬 Chat session started');
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        console.log('❌ Invalid last message:', lastMessage);
        throw new Error('Last message must be from user');
    }
    console.log('📝 Last user message:', lastMessage.content);
    // Send the message and get response
    const result = await sendMessageToGemini(chat, lastMessage.content);
    console.log('📤 Service result:', result);
    return result;
}
//# sourceMappingURL=chatService.js.map