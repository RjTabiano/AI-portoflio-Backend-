const app = require('./index.js');

module.exports = (req, res) => {
  app.handle(req, res);
};