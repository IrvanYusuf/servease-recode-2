const app = require("./app.js");
const { CONFIG } = require("@/config/index.js");

const PORT = CONFIG.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
