const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Table = require("cli-table3");

// Ambil argumen: middleware
const args = process.argv.slice(2);
const input = args[0]; // auth

// Jika --help atau -h
if (input === "--help" || input === "-h") {
  console.log(chalk.bold.green("\n🛠  make:middleware CLI Help\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    "  " +
      chalk.cyan("npm run make:middleware") +
      " " +
      chalk.yellow("<name_middleware>")
  );
  console.log("");

  console.log(chalk.bold("Examples:"));
  console.log("  " + chalk.cyan("npm run make:middleware auth"));
  console.log("  " + chalk.cyan("npm run make:middleware v1/role"));
  console.log("");

  const optionTable = new Table({
    head: [chalk.bold("Option"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  optionTable.push(["--help, -h", "Show this help message"]);

  console.log(chalk.bold("Options:"));
  console.log(optionTable.toString());
  console.log("");

  const outputTable = new Table({
    head: [chalk.bold("Output Structure"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  outputTable.push([
    "<name_middleware>Middleware",
    "Create a middleware (eg: authMiddleware)",
  ]);

  console.log(chalk.bold("Output Middleware:"));
  console.log(outputTable.toString());
  console.log("");

  console.log(chalk.bold("Output Location:"));
  console.log(
    "  " + chalk.yellow("src/middlewares/<path>/<name>.middleware.js")
  );
  console.log("");
  console.log(chalk.bold("Example Output Location:"));
  console.log("  " + chalk.yellow("src/middlewares/auth.middleware.js"));
  console.log("  " + chalk.yellow("src/middlewares/v1/role.middleware.js"));
  console.log("");

  process.exit(0);
}

if (!input || input.startsWith("--")) {
  console.error("❌ Usage: npm run make:middleware <name>");
  process.exit(1);
}

const parts = input.split("/");
const rawName = parts.pop(); // role

const dirPath = parts.join("/"); // v1

const kebabName = rawName.toLowerCase();
const fileName = `${kebabName}.middleware.js`;
const functionName = `${kebabName}Middleware`;
const routePath = path.resolve(__dirname, `../src/middlewares/${dirPath}`);
const filePath = path.join(routePath, fileName);

// Template isi file
const content = `const ${functionName} = (req, res, next) => {
  // TODO: Implement ${input} middleware logic
  next();
};

module.exports = ${functionName};
`;

// Cegah overwrite
if (fs.existsSync(filePath)) {
  console.error(`❌ Middleware already exists: src/middlewares/${fileName}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);
console.log(`✅ Middleware created at: src/middlewares/${fileName}`);
