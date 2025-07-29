// src/index.ts
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { ENV, CORS_CONFIG, RATE_LIMIT_CONFIG, validateConfig } from "./config";
import chatRouter from "./routes/chat";
// Validate configuration on startup
validateConfig();
const app = express();
// Security middleware
app.use(helmet());
// CORS configuration
app.use(cors(CORS_CONFIG));
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
const limiter = rateLimit(RATE_LIMIT_CONFIG);
app.use(limiter);
// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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
        environment: ENV.NODE_ENV,
        version: '1.0.0'
    };
    res.status(200).json(healthResponse);
});
// Routes
app.use("/chat", chatRouter);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    const errorResponse = {
        success: false,
        error: 'Internal server error',
        message: ENV.NODE_ENV === 'development' ? err.message : 'Something went wrong'
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
export default app;
//# sourceMappingURL=index.js.map