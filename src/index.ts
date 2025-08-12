// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { ENV, CORS_CONFIG, RATE_LIMIT_CONFIG, validateConfig } from "./config/index.js";
import chatRouter from "./routes/chat.js";
import type { HealthCheckResponse, ApiResponse } from "./types/index.js";

// Validate configuration on startup
validateConfig();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://ai-portfolio-ivory-beta.vercel.app',
    'https://ai-portfolio-rjtabianos-projects.vercel.app',
    'https://ai-portfolio.vercel.app',
    'https://rjtabiano-portfolio.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit(RATE_LIMIT_CONFIG);
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Express server is working on Vercel!');
});

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});


app.get('/health', (req: Request, res: Response<HealthCheckResponse>) => {
  const healthResponse: HealthCheckResponse = {
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
app.use((err: Error, req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  console.error('Error:', err);
  const errorResponse: ApiResponse = {
    success: false,
    error: 'Internal server error',
    message: ENV.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  };
  res.status(500).json(errorResponse);
});

// 404 handler
app.use('*', (req: Request, res: Response<ApiResponse>) => {
  const notFoundResponse: ApiResponse = {
    success: false,
    error: 'Route not found'
  };
  res.status(404).json(notFoundResponse);
});

// Export the app for Vercel serverless deployment
export default app; 