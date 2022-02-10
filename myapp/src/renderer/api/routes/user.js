const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../auth/config");
const auth = require("../auth/auth");

/** ユーザー登録 */
router.post("/register", (req, res) => {
  console.log('登録')
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
router.get("/api/auth/login",auth, (req, res) => {
  console.log('koko');
  console.log(req.headers.token);
  res.status(200).json({
    msg: "認証成功",
  });
});

module.exports = router;
