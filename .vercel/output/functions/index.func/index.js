const app = require('./app.js').default;

module.exports = (req, res) => {
  app.handle(req, res);
}; 