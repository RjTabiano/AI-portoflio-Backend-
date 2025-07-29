import app from '../src/index';
import { IncomingMessage, ServerResponse } from 'http';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  (app as any).handle(req, res);
}
