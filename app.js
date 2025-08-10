require("./src/alias.js");
const express = require("express");
const morgan = require("morgan");
const connectDb = require("@/database/db.js");
const apiEndpoints = require("@/routes/index.js");
const cors = require("cors");
const multerErrorHandler = require("@/errors/multerError.js");
const errorHandler = require("@/errors/errorHandler");
const { CONFIG } = require("@/config/index.js");

// dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
app.get("/", (req, res) => {
  res.send("halo");
});
app.use("/api", apiEndpoints);
app.use(errorHandler);
app.use(multerErrorHandler);

const PORT = CONFIG.PORT || 3300;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
