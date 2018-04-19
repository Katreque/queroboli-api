const App = require('./app.js');

module.exports = function(app, db) {
  app.get('/boli-pessoa-escolhida', (req, res) => {
    res.send({pessoa: App.retornaPessoaEscolhida()});
  });

  app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
    res.send({pessoas: App.retornaListaPessoasDisponiveis()});
  });
};
