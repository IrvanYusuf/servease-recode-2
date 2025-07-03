require("module-alias/register");
// import dotenv from "dotenv";
const express = require("express");
const connectDb = require("@/database/db.js");
const apiEndpoints = require("@/routes/index.js");
const cors = require("cors");

// dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
app.get("/", (req, res) => {
  res.send("halo");
});
app.use("/api", apiEndpoints);

module.exports = app;
