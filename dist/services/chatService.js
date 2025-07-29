// src/services/chatService.ts
import { sendMessageToGemini } from '../adapters/geminiAdapter.js';
export async function getGeminiReply(messages) {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        throw new Error('Last message must be from user');
    }
    // Send the message and get response
    const result = await sendMessageToGemini(null, lastMessage.content);
    return result;
}
//# sourceMappingURL=chatService.js.map