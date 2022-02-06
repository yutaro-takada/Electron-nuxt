const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const config = require("./auth/config");
const auth = require("./auth/auth");
const jwt = require("jsonwebtoken");
// const cors = require("cors");
const contractRouter = require("./routes/contract");
const userRouter = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/** ルーティング設定 */
app.use("/contract", contractRouter);
app.use("/user", userRouter);

/** ユーザー登録 */
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
app.get("/api/auth/login", auth, (req, res) => {
  console.log(res);
  res.status(200).json({
    msg: "認証成功",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
