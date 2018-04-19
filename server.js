const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const app = express();
const App = require('./app/app.js');

const port = process.env.PORT || 7770;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MongoClient.connect(db.url, (err, client) => {

  if (err) {
    return console.log(err);
  }

  const db = client.db('queroboli')
  const main = new App(db);
  require('./app/routes')(app, db, main);

  app.listen(port, () => {
    console.log('Porta: ' + port);
  });
})
