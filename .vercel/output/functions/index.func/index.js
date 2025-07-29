const app = require('../../../../src/index.ts');

module.exports = (req, res) => {
  app.handle(req, res);
}; 