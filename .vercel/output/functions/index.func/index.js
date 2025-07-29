const app = require('../../../dist/src/index.js');

module.exports = (req, res) => {
  app.handle(req, res);
}; 