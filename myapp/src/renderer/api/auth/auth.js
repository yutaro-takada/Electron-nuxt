const jwt = require("jsonwebtoken");
const config = require("./config");

/** tokenの認証確認処理
 * tokenに問題がなければNext()で[auth]を抜けてログイン処理に戻る
*/
function auth(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log(decoded);
    next();
  } catch (err) {
    return res.send(401).json({
      msg: "認証NG",
    });
  }
}

module.exports = auth;
