"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeminiReply = getGeminiReply;
// src/services/chatService.ts
const geminiAdapter_js_1 = require("../adapters/geminiAdapter.js");
async function getGeminiReply(messages) {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
        throw new Error('Last message must be from user');
    }
    // Send the message and get response
    const result = await (0, geminiAdapter_js_1.sendMessageToGemini)(null, lastMessage.content);
    return result;
}
//# sourceMappingURL=chatService.js.map