// src/routes/chat.ts
import { Router } from 'express';
import { sendChat } from '../controllers/chatController.js';
const router = Router();
router.post('/send', sendChat);
export default router;
//# sourceMappingURL=chat.js.map