import type { SafetySetting, GenerationConfig, ModelConfig } from '../types/index.js';
export interface Environment {
    NODE_ENV: string;
    PORT: number;
    GEMINI_API_KEY: string;
}
export declare const ENV: Environment;
export declare const SAFETY_SETTINGS: SafetySetting[];
export declare const GENERATION_CONFIG: GenerationConfig;
export declare const MODEL_CONFIG: ModelConfig;
export interface CorsConfig {
    origin: string | string[];
    credentials: boolean;
    optionsSuccessStatus: number;
}
export declare const CORS_CONFIG: CorsConfig;
export interface RateLimitConfig {
    windowMs: number;
    max: number;
    message: string;
}
export declare const RATE_LIMIT_CONFIG: RateLimitConfig;
export declare const validateConfig: () => void;
//# sourceMappingURL=index.d.ts.map