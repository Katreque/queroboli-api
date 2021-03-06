const Moment = require('moment');
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

  recuperaListaTotalPessoas()
    .then((res) => {
      listaPessoasDisponiveisPogChamp = res;
    })

  recuperaPessoaEscolhida()
    .then((res) => {
      pessoaEscolhida = res;
    })

    verificaAtualizacaoDados();
}

var escolhePessoa = function(_listaPessoasDisponiveisPogChamp, _listaTotalPessoas, _pessoaEscolhida) {
  if (_listaPessoasDisponiveisPogChamp.length !== 0) {
    let escolhida;

    if (_listaPessoasDisponiveisPogChamp.length === 1) {
      escolhida = _listaPessoasDisponiveisPogChamp;
      _listaPessoasDisponiveisPogChamp = [{id: 1, pessoa: ''}];

      updateBancoListaPessoasDisponiveis(_listaPessoasDisponiveisPogChamp)
        .then(() => {
          pessoaEscolhida = escolhida;
          updateBancoPessoaEscolhida(escolhida);
          listaPessoasDisponiveisPogChamp = [];
        })
    } else {
      let index = Math.floor(Math.random() * _listaPessoasDisponiveisPogChamp.length);
      escolhida = listaPessoasDisponiveisPogChamp.splice(index, 1);

      updateBancoListaPessoasDisponiveis(_listaPessoasDisponiveisPogChamp)
      .then(() => {
        pessoaEscolhida = escolhida;
        updateBancoPessoaEscolhida(escolhida);
      });
    }
  } else {
    recuperaListaTotalPessoas()
    .then((res) => {
      listaPessoasDisponiveisPogChamp = res;
      console.log('Atualizando Lista disponiveis');
      escolhePessoa(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida);
    })
  }
}

/*var controleTempo = function() {
    escolhePessoa(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida);
  setInterval(() => {
    escolhePessoa(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida);
  }, 1000*60*30)
}*/

var verificaAtualizacaoDados = function() {
  return new Promise((resolve, reject) => {
    let now = new Date();

    recuperaDataAtualizacao()
    .then((dataServidor) => {
      if (Moment(now).minute() != Moment(dataServidor).minute() && Moment(now) > Moment(dataServidor)) {
        escolhePessoa(listaPessoasDisponiveisPogChamp, listaTotalPessoas, pessoaEscolhida);
      }
    })
    .catch((err) => {
      console.log(err);
    })

    updateDataAtualizacao(Moment(now).format())
    .then(() => {
      console.log('DataAtualização atualizada: ' + now);
      resolve();
    })
    .catch((err) => {
      reject(err);
    })
  })
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

var recuperaDataAtualizacao = function() {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM dataAtualizacao', (err, _dataAtualizacao) => {
      if (err) {
        console.log({'error': err });
        reject(err);
      } else {
        let retorno = JSON.parse(JSON.stringify(_dataAtualizacao.rows));
        resolve(retorno);
      }
    });
  })
}

var updateDataAtualizacao = function(data) {
  return new Promise((resolve, reject) => {
    db.query('UPDATE dataAtualizacao SET data = \''+data+'\' WHERE ID = 1', (err, _dataAtualizacao) => {
      if (err) {
        console.log({'error': err });
        reject();
      } else {
        console.log('Update na dataAtualizacao realizado com sucesso!');
        resolve();
      }
    });
  })
}

module.exports = {
  construct: construct,
  retornaPessoaEscolhida: retornaPessoaEscolhida,
  retornaListaPessoasDisponiveis: retornaListaPessoasDisponiveis,
  verificaAtualizacaoDados: verificaAtualizacaoDados
}
