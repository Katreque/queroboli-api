const Server = require('../../server.js');
const main = require('../app.js')

  Server.App.get('/boli-pessoa-escolhida', (req, res) => {
    res.send({pessoa: main.retornaPessoaEscolhida()});
  });

  Server.App.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
    res.send({pessoas: main.retornaListaPessoasDisponiveis()});
  });
