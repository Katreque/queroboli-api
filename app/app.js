const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

const db = client;
db.connect();

var pessoaEscolhida = "";
var listaPessoasDisponiveisPogChamp = [];
var listaTotalPessoas = [];

var construct = function() {
  recuperaListaTotalPessoas()
    .then((res) => {
      listaTotalPessoas = res;
    })

  recuperaListaPessoasDisponiveis()
    .then((res) => {
      listaPessoasDisponiveisPogChamp = res;
    })

  recuperaPessoaEscolhida()
    .then((res) => {
      pessoaEscolhida = res;
    })

  controleTempo();
}

var escolhePessoa = function(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida) {
  if (listaPessoasDisponiveisPogChamp.length !== 0) {
    let index = Math.floor(Math.random() * listaPessoasDisponiveisPogChamp.length);
    let escolhida = listaPessoasDisponiveisPogChamp.splice(index, 1);
    updateBancoListaPessoasDisponiveis(listaPessoasDisponiveisPogChamp);
      .then(() => {
        pessoaEscolhida = escolhida;
        .then(() => {
          updateBancoPessoaEscolhida(pessoaEscolhida);
        })
      })
  }

  recuperaListaTotalPessoas()
    .then((res) => {
      listaPessoasDisponiveisPogChamp = res;
      console.log("ListaDisponivel " + listaPessoasDisponiveisPogChamp);
      console.log("ListaTotal " + res);
    })
}

var controleTempo = function() {
  setInterval(() => {
    escolhePessoa(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida);
  }, 15000)
}

var retornaPessoaEscolhida = function() {
  return pessoaEscolhida;
}

var retornaListaPessoasDisponiveis = function() {
  return listaPessoasDisponiveisPogChamp;
}

var recuperaListaTotalPessoas = function() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM totalPessoas', (err, listagemPessoas) => {
      if (err) {
          console.log({'error': err });
          return reject(err);
      } else {
          let retorno = JSON.parse(JSON.stringify(listagemPessoas.rows));
          return resolve(retorno);
      }
    });
  })
}

var updateBancoListaTotalPessoas = function() {
  //Não há necessidade por enquanto.
}

var recuperaListaPessoasDisponiveis = function() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM pessoasDisponiveis', (err, pessoasDisponiveis) => {
      if (err) {
        console.log({'error': err });
        reject(err);
      } else {
        let retorno = JSON.parse(JSON.stringify(pessoasDisponiveis.rows));
        resolve(retorno);
      }
    });
  })
}

var updateBancoListaPessoasDisponiveis = function(pessoas) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < pessoas.length; i++) {
      db.query('UPDATE pessoasDisponiveis SET pessoa = \''+(pessoas[i].pessoa)+'\' WHERE ID = '+i+'', (err, _pessoaEscolhida) => {
        if (err) {
          console.log({'error': err });
          reject();
        } else {
          console.log('Update na pessoasDisponiveis realizado com sucesso!');
          resolve();
        }
      });
    }
  })
}

var recuperaPessoaEscolhida = function() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM pessoaEscolhida', (err, _pessoaEscolhida) => {
      if (err) {
        console.log({'error': err });
        reject(err);
      } else {
        let retorno = JSON.parse(JSON.stringify(_pessoaEscolhida.rows));
        resolve(retorno);
      }
    });
  })
}

var updateBancoPessoaEscolhida = function(pessoa) {
  return new Promise((resolve, reject) => {
    db.query('UPDATE pessoaEscolhida SET pessoa = \''+(pessoa[0].pessoa)+'\' WHERE ID = 1', (err, _pessoaEscolhida) => {
      if (err) {
        console.log({'error': err });
        reject();
      } else {
        console.log('Update na pessoaEscolhida realizado com sucesso!');
        resolve();
      }
    });
  })
}

module.exports = {
  construct: construct,
  retornaPessoaEscolhida: retornaPessoaEscolhida,
  retornaListaPessoasDisponiveis: retornaListaPessoasDisponiveis
}
