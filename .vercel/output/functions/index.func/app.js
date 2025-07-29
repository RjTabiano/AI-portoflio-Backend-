"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const chat_1 = __importDefault(require("./routes/chat"));
// Validate configuration on startup
(0, config_1.validateConfig)();
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// CORS configuration
app.use((0, cors_1.default)(config_1.CORS_CONFIG));
// Additional CORS headers for preflight requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
// Rate limiting
const limiter = (0, express_rate_limit_1.default)(config_1.RATE_LIMIT_CONFIG);
app.use(limiter);
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check endpoint
app.get('/', (req, res) => {
    res.send('Express server is working on Vercel!');
});
app.get("/", (req, res) => {
    res.send("Hello from Vercel!");
});
app.get('/health', (req, res) => {
    const healthResponse = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: config_1.ENV.NODE_ENV,
        version: '1.0.0'
    };
    res.status(200).json(healthResponse);
});
// Routes
app.use("/chat", chat_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const errorResponse = {
        success: false,
        error: 'Internal server error',
        message: config_1.ENV.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    };
    res.status(500).json(errorResponse);
});
// 404 handler
app.use('*', (req, res) => {
    const notFoundResponse = {
        success: false,
        error: 'Route not found'
    };
    res.status(404).json(notFoundResponse);
});
// Export the app for Vercel serverless deployment
exports.default = app;
//# sourceMappingURL=index.js.map