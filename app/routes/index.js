const boli = require('./boli.js');
const App = require('./app.js');

module.exports = function(app, db) {
  boli(app, db);
  App(app, db);
};
