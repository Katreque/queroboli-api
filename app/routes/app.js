module.exports = function(app, db) {
  const ObjectId = require('mongodb').ObjectID;

  var pessoaEscolhida = "";
  var listaPessoasDisponiveisPogChamp = [];
  var listaTotalPessoas = [];

  recuperaListaTotalPessoas();
  recuperaListaPessoasDisponiveis();
  recuperaPessoaEscolhida();

  controleTempo();

  var escolhePessoa = function() {
    if (listaPessoasDisponiveisPogChamp.length !== 0) {
      let index = Math.floor(Math.random() * listaPessoasDisponiveisPogChamp.length);
      let escolhida = listaPessoasDisponiveisPogChamp.splice(index, 1);
      updateBancoListaPessoasDisponiveis(listaPessoasDisponiveisPogChamp);

      pessoaEscolhida = escolhida;
      updateBancoPessoaEscolhida(pessoaEscolhida);
    }

    return listaPessoasDisponiveisPogChamp = listaTotalPessoas;
  }

  var controleTempo = function() {
    setInterval(() => {
      return escolhePessoa();
    }, 5000)
  }

  var retornaPessoaEscolhida = function() {
    return pessoaEscolhida;
  }

  var retornaListaPessoasDisponiveis = function() {
    return listaPessoasDisponiveisPogChamp;
  }

  var recuperaListaTotalPessoas = function() {
    db.collection('listagemPessoas').find().toArray((err, listagemPessoas) => {
      if (err) {
        console.log({'error': err });
      } else {
        listaTotalPessoas = listagemPessoas[0];
      }
    });
  }

  var updateBancoListaTotalPessoas = function() {
    //Não há necessidade por enquanto.
  }

  var recuperaListaPessoasDisponiveis = function() {
    db.collection('listagemPessoasDisponiveisPogChamp').find().toArray((err, listagemPessoasDisponiveisPogChamp) => {
      if (err) {
        console.log({'error': err });
      } else {
        listaPessoasDisponiveisPogChamp = listagemPessoasDisponiveisPogChamp[0];
      }
    });
  }

  var updateBancoListaPessoasDisponiveis = function(pessoas) {
    const query = {_id: new ObjectId("5ad8d9b19db4aa00149c2264")};
    const update = {$set:{pessoasDisponiveis: pessoas}}

    db.collection('listagemPessoasDisponiveisPogChamp').updateOne(query, update, (err, result) => {
      if (err) {
        console.log({'error': err });
      }
    });
  }

  var recuperaPessoaEscolhida = function() {
    db.collection('pessoaEscolhida').find().toArray((err, pessoaEscolhida) => {
      if (err) {
        console.log({'error': err });
      } else {
        pessoaEscolhida = pessoaEscolhida[0];
      }
    });
  }

  var updateBancoPessoaEscolhida = function(pessoa) {
    const query = {_id: new ObjectId("5ad8d2accba15a0014a2289c")};
    const update = {$set:{pessoaEscolhida: pessoa}}

    db.collection('pessoaEscolhida').updateOne(query, update, (err, result) => {
      if (err) {
        console.log({'error': err });
      }
    });
  }
}
