const moduleAlias = require("module-alias");
const path = require("path");

// Debug: Print current directory
console.log("Current directory:", __dirname);
console.log("Alias path:", path.resolve(__dirname));

// Set alias
moduleAlias.addAlias("@", path.resolve(__dirname));

module.exports = moduleAlias;
