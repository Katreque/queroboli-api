const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const app = express();

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
  require('./app')(app, db);

  app.listen(port, () => {
    console.log('Porta: ' + port);
  });
})
