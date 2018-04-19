module.exports = function(app, db) {
  const ObjectId = require('mongodb').ObjectID;

  this.pessoaEscolhida = "";
  this.listaPessoasDisponiveisPogChamp = [];
  this.listaTotalPessoas = [];

  this.recuperaListaTotalPessoas();
  this.recuperaListaPessoasDisponiveis();
  this.recuperaPessoaEscolhida();

  this.controleTempo();

  var escolhePessoa = function() {
    if (this.listaPessoasDisponiveisPogChamp.length !== 0) {
      let index = Math.floor(Math.random() * this.listaPessoasDisponiveisPogChamp.length);
      let escolhida = this.listaPessoasDisponiveisPogChamp.splice(index, 1);
      this.updateBancoListaPessoasDisponiveis(this.listaPessoasDisponiveisPogChamp);

      this.pessoaEscolhida = escolhida;
      this.updateBancoPessoaEscolhida(this.pessoaEscolhida);
    }

    return this.listaPessoasDisponiveisPogChamp = this.listaTotalPessoas;
  }

  var controleTempo = function() {
    setInterval(() => {
      return this.escolhePessoa();
    }, 5000)
  }

  var retornaPessoaEscolhida = function() {
    return this.pessoaEscolhida;
  }

  var retornaListaPessoasDisponiveis = function() {
    return this.listaPessoasDisponiveisPogChamp;
  }

  var recuperaListaTotalPessoas = function() {
    db.collection('listagemPessoas').find().toArray((err, listagemPessoas) => {
      if (err) {
        console.log({'error': err });
      } else {
        this.listaTotalPessoas = listagemPessoas[0];
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
        this.listaPessoasDisponiveisPogChamp = listagemPessoasDisponiveisPogChamp[0];
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
        this.pessoaEscolhida = pessoaEscolhida[0];
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
