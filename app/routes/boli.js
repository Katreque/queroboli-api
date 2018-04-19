module.exports = function(app, db) {
  app.get('/boli-pessoa-escolhida', (req, res) => {
    db.collection('pessoaEscolhida').find().toArray((err, pessoaEscolhida) => {
      if (err) {
        res.send({'error': err });
        } else {
          res.send(pessoaEscolhida);
        }
    });
  });

  app.post('/boli-pessoa-escolhida', (req, res) => {
    const pessoaEscolhida = {
      pessoaEscolhida: req.body.pessoaEscolhida
    };

    db.collection('pessoaEscolhida').insert(pessoaEscolhida, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.post('/boli-pessoa-escolhida-update', (req, res) => {
    const pessoaEscolhida = {
      pessoa: req.body.pessoaEscolhida
    };

    const query = {_id: "5ad8a4fe196e0900145c1a0c"};
    const update = {$set:{pessoaEscolhida: pessoaEscolhida.pessoa}}

    db.collection('pessoaEscolhida').updateOne(query, update, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.get('/boli-listagem-pessoas', (req, res) => {
    db.collection('listagemPessoasDisponiveis').find().toArray((err, listagemPessoas) => {
      if (err) {
        res.send({'error': err });
        } else {
          res.send(listagemPessoas);
        }
    });
  });

  app.post('/boli-listagem-pessoas', (req, res) => {
    const listagemPessoas = {
      pessoasDisponiveis: [
        'Renan Verissimo',
        'Phills Bad man',
        'Eric KappaPride',
        'Leo Pederasta',
        'Nogueira 4Head',
        'Vitin BacknoKibe'
      ]
    };
    db.collection('listagemPessoasDisponiveis').insert(listagemPessoas, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
