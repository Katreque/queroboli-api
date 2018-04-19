module.exports = function(app, db, main) {
  app.get('/boli-pessoa-escolhida', (req, res) => {
    res.send({pessoa: main.retornaPessoaEscolhida()});
  });

  app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
    res.send({pessoas: main.retornaListaPessoasDisponiveis()});
  });
};
