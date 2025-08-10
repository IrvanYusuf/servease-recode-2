"use strict";

var express = require("express");
var morgan = require("morgan");
var connectDb = require("./src/database/db.js");
// const apiEndpoints = require("./src/routes/index.js");
var cors = require("cors");
// const multerErrorHandler = require("./src/errors/multerError.js");
// const errorHandler = require("./src/errors/errorHandler.js");
// const { CONFIG } = require("./src/config/index.js");

// dotenv.config();

var app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
connectDb();
app.get("/", function (req, res) {
  res.send("halo");
});
// app.use("/api", apiEndpoints);
// app.use(errorHandler);
// app.use(multerErrorHandler);

var PORT = process.env.PORT || 3300;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
  });
}
module.exports = app;