const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const App = require('./app/app.js');
const { Client } = require('pg');

const port = process.env.PORT || 7770;
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/boli-pessoa-escolhida', (req, res) => {
  App.verificaAtualizacaoDados()
    .then(() => {
      return res.send({pessoa: App.retornaPessoaEscolhida()});
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
  App.verificaAtualizacaoDados()
    .then(() => {
      return res.send({pessoas: App.retornaListaPessoasDisponiveis()});
    })
    .catch((err) => {
      console.log(err);
    })
});

app.listen(port, () => {
  console.log('Porta: ' + port);
  App.construct();
});

module.exports = {
  App: app
}
