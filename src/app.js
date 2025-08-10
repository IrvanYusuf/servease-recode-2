const express = require("express");
const morgan = require("morgan");
const connectDb = require("./database/db.js");
// const apiEndpoints = require("./src/routes/index.js");
const cors = require("cors");
// const multerErrorHandler = require("./src/errors/multerError.js");
// const errorHandler = require("./src/errors/errorHandler.js");
// const { CONFIG } = require("./src/config/index.js");

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
// app.use("/api", apiEndpoints);
// app.use(errorHandler);
// app.use(multerErrorHandler);

const PORT = process.env.PORT || 3300;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
