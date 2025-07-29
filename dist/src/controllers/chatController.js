"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChat = void 0;
const chatService_js_1 = require("../services/chatService.js");
const sendChat = async (req, res) => {
    try {
        console.log('📨 Received chat request:', req.body);
        const { messages } = req.body;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            console.log('❌ Invalid messages array');
            res.status(400).json({ success: false, error: 'Messages array is required' });
            return;
        }
        console.log('🔄 Calling getGeminiReply...');
        const result = await (0, chatService_js_1.getGeminiReply)(messages);
        console.log('📤 Gemini reply result:', result);
        console.log('📤 Sending response to client:', result);
        res.json(result);
    }
    catch (error) {
        console.error('❌ Error in sendChat:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.sendChat = sendChat;
//# sourceMappingURL=chatController.js.map