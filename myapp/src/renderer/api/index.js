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

/** 全件検索(SELECT ALL) */
app.get("/", function (req, res) {
  res.set({ "Access-Control-Allow-Origin": "*" });
  const sql = "select * from users order by id LIMIT 100;";
  connection.query(sql, function (error, result, fields) {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.send(result);
  });
});

/** IDによる検索(SELECT WHERE) */
app.post("/select_id", (req, res) => {
  const val = req.body.id;
  console.log("SELECT ID");
  const sql = "SELECT * FROM users WHERE id = ?";
  connection.query(sql, val, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
    return res.send(result);
  });
});

/** 編集による修正(UPDATE) */
app.post("/edit/:id", (req, res) => {
  console.log(req.params.id);
  const val = {
    name: req.body.name,
    email:req.body.mail,
    pass:req.body.pass
  } ;
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  connection.query(sql,val, function (err, result, fields) {
      console.log(result);
      if (err) {
        console.log(err);
        return res.status(400).json({ err: err.message });
      }
      console.log(result);
      return res.send(result);
    }
  );
});

/** データ登録(INSERT) */
app.post("/", (req, res) => {
  const sql = "INSERT INTO users SET ?";
  const val = {
    name: req.body.name,
    email: req.body.email,
    pass: req.body.pass,
  };
  connection.query(sql, val, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
    console.log("INSERT SUCCESS!");
    return res.send(result);
  });
});

/** データ削除(DELETE) */
app.post("/delete/:id", (req, res) => {
  console.log(req.params.id);
  const sql = "DELETE FROM users WHERE id = ?";
  connection.query(sql, req.params.id, function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
    console.log("DELETE SUCESS!");
    return res.send(result);
  });
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}`));
