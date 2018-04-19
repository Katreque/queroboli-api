module.exports = function(app, db) {
  app.get('/boli', (req, res) => {
    db.collection('boli').find().toArray((err, notas) => {
      if (err) {
        res.send({'error': err });
        } else {
          res.send(notas);
        }
    });
  });

  app.post('/boli', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('boli').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': err });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
