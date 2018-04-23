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
  res.send({pessoa: App.retornaPessoaEscolhida()});
});

app.get('/boli-listagem-pessoas-disponiveis', (req, res) => {
  res.send({pessoas: App.retornaListaPessoasDisponiveis()});
});

app.listen(port, () => {
  console.log('Porta: ' + port);
  App.construct();
});

module.exports = {
  App: app
}
