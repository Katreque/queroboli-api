const Server = require('../../server.js');
const main = require('../app.js')

  Server.app.get('/boli-pessoa-escolhida', (req, res) => {
    res.send({pessoa: main.retornaPessoaEscolhida()});
  });

  Server.app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
    res.send({pessoas: main.retornaListaPessoasDisponiveis()});
  });
