const app = require("./app.js");
const { CONFIG } = require("./config/index.js");

const PORT = CONFIG.PORT || 3300;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
