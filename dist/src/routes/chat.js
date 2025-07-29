"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chat.ts
const express_1 = require("express");
const chatController_js_1 = require("../controllers/chatController.js");
const router = (0, express_1.Router)();
router.post('/send', chatController_js_1.sendChat);
exports.default = router;
//# sourceMappingURL=chat.js.map