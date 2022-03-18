const express = require("express");
const app = express();
const PORT = 3000;
const logger = require("morgan");

const router = require("./routes/router");

//Express
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

//Router
app.use("/", router);

module.exports = app;

const server = app.listen(PORT, () =>
  console.log(`#Running web crawler VIVA REAL on port => ${PORT}!`)
);
server.timeout = 600000;
