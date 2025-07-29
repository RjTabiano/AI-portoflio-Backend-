const app = require('../dist/index.js');

export default function handler(req, res) {
  return app.handle(req, res);
}
