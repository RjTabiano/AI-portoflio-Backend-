import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../dist/index.js'; // assuming your build output is dist/index.js

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res); // or app.handle(req, res) if you're using express
}
