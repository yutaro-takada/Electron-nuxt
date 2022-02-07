const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const contractRouter = require("./routes/contract");
const userRouter = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/** ルーティング設定 */
app.use("/contract", contractRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
