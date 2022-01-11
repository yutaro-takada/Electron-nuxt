const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const mysql = require('mysql'); 
const port = 5000;
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'testdb'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.set({ 'Access-Control-Allow-Origin': '*' }); 
  const sql = 'select * from test order by id;';
  connection.query(sql,function (error, result,fields) {
    if (error) {
        return res.status(400).json({error:error.message})
    }
        //console.log('First Connect')
        return res.send(result);
  });
});

app.post('/edit/:id', (req, res) => {
  const sql = "UPDATE test SET name = ? WHERE id = ?";
  connection.query(sql, [req.body.name,req.params.id], function (err, result, fields) {
    console.log(result);
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
      console.log('EDIT SUCCESS!')
      return res.send(result);
  })
})

app.post('/', (req, res) => {
  const sql = "INSERT INTO users SET ?"
  const val = {
          name: req.body.name,
          email: req.body.email,
          pass: req.body.pass
  };
    connection.query(sql, val ,function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
      console.log('INSERT SUCCESS!');
      return res.send(result);
  })
});

app.post('/delete/:id', (req, res) => {
  const sql = "DELETE FROM test WHERE id = ?";
  connection.query(sql, req.params.id, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
      console.log('DELETE SUCESS!');
      return res.send(result);
  })
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}`));
