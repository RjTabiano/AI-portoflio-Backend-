// src/types/gemini.ts
import type { 
  GenerateContentResult, 
  ChatSession, 
  GenerativeModel,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig as GeminiGenerationConfig
} from '@google/generative-ai';

// Extended types for our application
export interface SafetySetting {
  category: HarmCategory;
  threshold: HarmBlockThreshold;
}

export interface GenerationConfig extends GeminiGenerationConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
}

export interface ModelConfig {
  model: string;
  safetySettings: SafetySetting[];
  generationConfig: GenerationConfig;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  response: string | null;
  tool_call?: string | null;
  timestamp: Date;
}

export interface ChatSessionData {
  chat: ChatSession;
  createdAt: Date;
  messageCount: number;
}

// Tool Call Types
export interface FunctionDefinition {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface ToolCall {
  functionCall: {
    name: string;
    args: Record<string, any>;
  };
}

// Error types
export interface GeminiError extends Error {
  code?: string;
  status?: number;
  details?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface HealthCheckResponse {
  status: 'OK' | 'ERROR';
  timestamp: string;
  environment: string;
  version?: string;
} 