module.exports = (app, db) {
  class App {
    constructor() {
      const ObjectId = require('mongodb').ObjectID;

      this.pessoaEscolhida = "";
      this.listaPessoasDisponiveisPogChamp = [];
      this.listaTotalPessoas = [];

      this.recuperaListaTotalPessoas();
      this.recuperaListaPessoasDisponiveis();
      this.recuperaPessoaEscolhida();

      this.controleTempo();
    }

    escolhePessoa() {
      if (this.listaPessoasDisponiveisPogChamp.length !== 0) {
        let index = Math.floor(Math.random() * this.listaPessoasDisponiveisPogChamp.length);
        let escolhida = this.listaPessoasDisponiveisPogChamp.splice(index, 1);
        this.updateBancoListaPessoasDisponiveis(this.listaPessoasDisponiveisPogChamp);

        this.pessoaEscolhida = escolhida;
        this.updateBancoPessoaEscolhida(this.pessoaEscolhida);
      }

      return this.listaPessoasDisponiveisPogChamp = this.listaTotalPessoas;
    }

    controleTempo() {
      setInterval(() => {
        return this.escolhePessoa();
      }, 5000)
    }

    var retornaPessoaEscolhida = () {
      return this.pessoaEscolhida;
    }

    var retornaListaPessoasDisponiveis = () {
      return this.listaPessoasDisponiveisPogChamp;
    }

    recuperaListaTotalPessoas() {
      db.collection('listagemPessoas').find().toArray((err, listagemPessoas) => {
        if (err) {
          console.log({'error': err });
        } else {
          this.listaTotalPessoas = listagemPessoas[0];
        }
      });
    }

    updateBancoListaTotalPessoas() {
      //Não há necessidade por enquanto.
    }

    recuperaListaPessoasDisponiveis() {
      db.collection('listagemPessoasDisponiveisPogChamp').find().toArray((err, listagemPessoasDisponiveisPogChamp) => {
        if (err) {
          console.log({'error': err });
        } else {
          this.listaPessoasDisponiveisPogChamp = listagemPessoasDisponiveisPogChamp[0];
        }
      });
    }

    updateBancoListaPessoasDisponiveis(pessoas) {
      const query = {_id: new ObjectId("5ad8d9b19db4aa00149c2264")};
      const update = {$set:{pessoasDisponiveis: pessoas}}

      db.collection('listagemPessoasDisponiveisPogChamp').updateOne(query, update, (err, result) => {
        if (err) {
          console.log({'error': err });
        }
      });
    }

    recuperaPessoaEscolhida() {
      db.collection('pessoaEscolhida').find().toArray((err, pessoaEscolhida) => {
        if (err) {
          console.log({'error': err });
        } else {
          this.pessoaEscolhida = pessoaEscolhida[0];
        }
      });
    }

    updateBancoPessoaEscolhida(pessoa) {
      const query = {_id: new ObjectId("5ad8d2accba15a0014a2289c")};
      const update = {$set:{pessoaEscolhida: pessoa}}

      db.collection('pessoaEscolhida').updateOne(query, update, (err, result) => {
        if (err) {
          console.log({'error': err });
        }
      });
    }
  }
}
