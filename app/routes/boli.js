var ObjectId = require('mongodb').ObjectID;

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

    const query = {_id: new ObjectId("5ad8d2accba15a0014a2289c")};
    const update = {$set:{pessoaEscolhida: pessoaEscolhida.pessoa}}

    db.collection('pessoaEscolhida').updateOne(query, update, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.nModified);
      }
    });
  });

  //Listagem pessoas original

  app.get('/boli-listagem-pessoas', (req, res) => {
    db.collection('listagemPessoas').find().toArray((err, listagemPessoas) => {
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
    db.collection('listagemPessoas').insert(listagemPessoas, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  //Listagem pessoas disponiveis

  app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
    db.collection('listagemPessoasDisponiveisPogChamp').find().toArray((err, listagemPessoas) => {
      if (err) {
        res.send({'error': err });
        } else {
          res.send(listagemPessoas);
        }
    });
  });

  app.post('/boli-listagem-pessoas-disponiveis', (req, res) => {
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

    db.collection('listagemPessoasDisponiveisPogChamp').insert(listagemPessoas, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.post('/boli-listagem-pessoas-disponiveis-update', (req, res) => {
    const pessoasDisponiveis = {
      pessoas: req.body.pessoasDisponiveis
    };

    const query = {_id: new ObjectId("5ad8d2accba15a0014a2289c")};
    const update = {$set:{pessoasDisponiveis: pessoasDisponiveis.pessoas}}

    db.collection('listagemPessoasDisponiveisPogChamp').updateOne(query, update, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.nModified);
      }
    });
  });
};
