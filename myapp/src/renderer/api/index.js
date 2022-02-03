const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const port = 5000;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "testdb",
});
const config = require("./config");
const auth = require("./auth");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/** 登録 */
app.post("/register", (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
  };
  const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);
  const body = {
    username: req.body.username,
    email: req.body.email,
    token: token,
  };
  res.status(200).json(body);
});

/** ログイン認証 */
app.get("/login", auth, (req, res) => {
  console.log(res);
  res.status(200).json({
    msg: "認証成功",
  });
});

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
    email: req.body.mail,
    pass: req.body.pass,
  };
  const sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  connection.query(sql, val, function (err, result, fields) {
    console.log(result);
    if (err) {
      console.log(err);
      return res.status(400).json({ err: err.message });
    }
    console.log(result);
    return res.send(result);
  });
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));
