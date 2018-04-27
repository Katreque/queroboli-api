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
  listaTotalPessoas = recuperaListaTotalPessoas();
  listaPessoasDisponiveisPogChamp = recuperaListaPessoasDisponiveis();
  pessoaEscolhida = recuperaPessoaEscolhida();

  controleTempo();
}

var escolhePessoa = function() {
  if (listaPessoasDisponiveisPogChamp.length !== 0) {
    let index = Math.floor(Math.random() * listaPessoasDisponiveisPogChamp.length);
    let escolhida = listaPessoasDisponiveisPogChamp.splice(index, 1);
    updateBancoListaPessoasDisponiveis(listaPessoasDisponiveisPogChamp);

    pessoaEscolhida = escolhida;
    updateBancoPessoaEscolhida(pessoaEscolhida);
  }

  let retorno = recuperaListaTotalPessoas();
  listaPessoasDisponiveisPogChamp = retorno;
  console.log("ListaDisponivel " + listaPessoasDisponiveisPogChamp);
  console.log("ListaTotal " + retorno);
}

var controleTempo = function() {
  setInterval(() => {
    escolhePessoa();
  }, 15000)
}

var retornaPessoaEscolhida = function() {
  return pessoaEscolhida;
}

var retornaListaPessoasDisponiveis = function() {
  return listaPessoasDisponiveisPogChamp;
}

var recuperaListaTotalPessoas = function() {
  db.query('SELECT * FROM totalPessoas', (err, listagemPessoas) => {
    if (err) {
      console.log({'error': err });
    } else {
      let retorno = JSON.parse(JSON.stringify(listagemPessoas.rows));
      console.log(retorno);
      return retorno;
    }
  });
}

var updateBancoListaTotalPessoas = function() {
  //Não há necessidade por enquanto.
}

var recuperaListaPessoasDisponiveis = function() {
  db.query('SELECT * FROM pessoasDisponiveis', (err, pessoasDisponiveis) => {
    if (err) {
      console.log({'error': err });
    } else {
      let retorno = JSON.parse(JSON.stringify(pessoasDisponiveis.rows));
      console.log('Recupera Lista Pessoas' + retorno);
      return retorno;
    }
  });
}

var updateBancoListaPessoasDisponiveis = function(pessoas) {
  for(let i = 0; i < pessoas.length; i++) {
    db.query('UPDATE pessoasDisponiveis SET pessoa = \''+(pessoas[i].pessoa)+'\' WHERE ID = '+i+'', (err, _pessoaEscolhida) => {
      if (err) {
        console.log({'error': err });
      } else {
        console.log('Update na pessoasDisponiveis realizado com sucesso!');
      }
    });
  }
}

var recuperaPessoaEscolhida = function() {
  db.query('SELECT * FROM pessoaEscolhida', (err, _pessoaEscolhida) => {
    if (err) {
      console.log({'error': err });
    } else {
      let retorno = JSON.parse(JSON.stringify(_pessoaEscolhida.rows));
      console.log(retorno);
      return retorno;
    }
  });
}

var updateBancoPessoaEscolhida = function(pessoa) {
  db.query('UPDATE pessoaEscolhida SET pessoa = \''+(pessoa[0].pessoa)+'\' WHERE ID = 1', (err, _pessoaEscolhida) => {
    if (err) {
      console.log({'error': err });
    } else {
      console.log('Update na pessoaEscolhida realizado com sucesso!');
    }
  });
}

module.exports = {
  construct: construct,
  retornaPessoaEscolhida: retornaPessoaEscolhida,
  retornaListaPessoasDisponiveis: retornaListaPessoasDisponiveis
}
