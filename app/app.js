class App {
  constructor(db) {
    const Server = require('../server.js');

    this.db = Server.Client;
    this.pessoaEscolhida = "";
    this.listaPessoasDisponiveisPogChamp = [];
    this.listaTotalPessoas = [];

    //this.recuperaListaTotalPessoas();
    //this.recuperaListaPessoasDisponiveis();
    //this.recuperaPessoaEscolhida();

    this.db.connect();
    this.createBancoListaTotalPessoas();
    this.db.end();
    //this.controleTempo();
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

  retornaPessoaEscolhida() {
    return this.pessoaEscolhida;
  }

  retornaListaPessoasDisponiveis() {
    return this.listaPessoasDisponiveisPogChamp;
  }

  recuperaListaTotalPessoas() {
    this.db.query('SELECT', (err, listagemPessoas) => {
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

  createBancoListaTotalPessoas() {
    this.db.query('CREATE TABLE totalPessoas(id INT PRIMARY KEY NOT NULL, pessoa CHAR(50) NOT NULL)', (err, res) => {
      if (err) throw err;
      console.log(res)
    })

    this.db.query('INSERT INTO totalPessoas VALUES (1, Katreque)', (err, res) => {
      if (err) throw err;
      console.log(res)
    })

    this.db.query('INSERT INTO totalPessoas VALUES (2, 4HEAD)', (err, res) => {
      if (err) throw err;
      console.log(res)
    })

    this.db.query('INSERT INTO totalPessoas VALUES (3, KAPPA)', (err, res) => {
      if (err) throw err;
      console.log(res)
    })

    this.db.query('INSERT INTO totalPessoas VALUES (4, KAPPAPRIDE)', (err, res) => {
      if (err) throw err;
      console.log(res)
    })
  }

  recuperaListaPessoasDisponiveis() {
    this.db.collection('listagemPessoasDisponiveisPogChamp').find().toArray((err, listagemPessoasDisponiveisPogChamp) => {
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

    this.db.collection('listagemPessoasDisponiveisPogChamp').updateOne(query, update, (err, result) => {
      if (err) {
        console.log({'error': err });
      }
    });
  }

  recuperaPessoaEscolhida() {
    this.db.collection('pessoaEscolhida').find().toArray((err, pessoaEscolhida) => {
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

    this.db.collection('pessoaEscolhida').updateOne(query, update, (err, result) => {
      if (err) {
        console.log({'error': err });
      }
    });
    }
}
