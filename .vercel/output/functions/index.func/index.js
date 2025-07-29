const app = require('../../../../dist/index.js');

module.exports = (req, res) => {
  app.handle(req, res);
}; 