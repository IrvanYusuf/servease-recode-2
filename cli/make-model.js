#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const dotenv = require("dotenv");
const chalk = require("chalk");
const Table = require("cli-table3");

dotenv.config();

const dbProvider = process.env.DB_PROVIDER;

const args = process.argv.slice(2);
const input = args[0];
const modelName = input;

if (!input) {
  console.error("❌ Model name is required.\nUsage: npm run make:model User");
  process.exit(1);
}

if (dbProvider === "prisma") {
  console.error(chalk.yellow("❌ For now only support mongodb provider"));
  process.exit(1);
}

// Jika --help atau -h
if (input === "--help" || input === "-h") {
  console.log(chalk.bold.green("\n🛠  make:model CLI Help\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    "  " + chalk.cyan("npm run make:model") + " " + chalk.yellow("<model_name>")
  );
  console.log("");

  console.log(chalk.bold("Examples:"));
  console.log("  " + chalk.cyan("npm run make:model auth"));
  console.log("  " + chalk.cyan("npm run make:model post"));
  console.log("");

  const optionTable = new Table({
    head: [chalk.bold("Option"), chalk.bold("Description")],
    colWidths: [20, 60],
  });

  optionTable.push(["--help, -h", "Show this help message"]);

  console.log(chalk.bold("Options:"));
  console.log(optionTable.toString());
  console.log("");

  console.log(chalk.bold("Output:"));
  console.log(
    "- Generates a model file for either MongoDB or Prisma based on DB_PROVIDER."
  );
  console.log("- For MongoDB:");
  console.log("    → Creates file: src/models/<model>.model.js");
  console.log("    → With default schema: { name: String, timestamps: true }");

  console.log("- For Prisma " + chalk.yellow("(ongoing):"));
  console.log("    → Appends basic model definition to prisma/schema.prisma");
  console.log("    → Runs `npx prisma generate` to update Prisma Client");
  console.log(
    "    → " +
      chalk.yellow(
        "Note: field definitions are not customizable yet — feature is ongoing.\n"
      )
  );

  // Methods table
  const methodsTable = new Table({
    head: [chalk.bold("Column"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  const methods = [
    ["name", "String, required"],
    ["timestamps", "true"],
  ];

  methods.forEach((method) => methodsTable.push(method));

  console.log(chalk.bold("Output:"));
  console.log(methodsTable.toString());
  console.log("");

  process.exit(0);
}

if (dbProvider === "mongodb") {
  // Format nama file dan model
  const modelNameMongo = path.basename(modelName);
  const modelFileName = modelNameMongo.toLowerCase() + ".model.js";
  const modelDir = path.join(__dirname, "..", "src", "models");
  const modelPath = path.join(modelDir, modelFileName);

  // excluding the first letter
  const firstLetter = modelNameMongo.charAt(0);
  // transform to uppercase
  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = modelNameMongo.slice(1);
  const modelNameCapitalize = firstLetterCap + remainingLetters;

  // isi template untuk model
  const template = `const { model, Schema } = require("mongoose");
  
const ${modelNameMongo}Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ${modelNameCapitalize} = model("${modelNameCapitalize}", ${modelNameMongo}Schema);

module.exports = {${modelNameCapitalize}};
`;

  // Buat folder jika belum ada
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir, { recursive: true });
  }

  // Cegah overwrite
  if (fs.existsSync(modelPath)) {
    console.error(`❌ Model ${modelNameMongo} already exists at: ${modelPath}`);
    process.exit(1);
  }

  // Tulis file
  fs.writeFileSync(modelPath, template);
  console.log(`✅ Model created at: src/models/${modelFileName}`);
} else if (dbProvider === "prisma") {
  const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
  // Baca isi schema.prisma
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");

  // Cek apakah model sudah ada
  const modelRegex = new RegExp(`model\\s+${modelName}\\s+{`);
  if (modelRegex.test(schemaContent)) {
    console.error(`❌ Model ${modelName} already exists in schema.prisma`);
    process.exit(1);
  }
  const modelTemplate = `
model ${modelName} {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;

  fs.appendFileSync(schemaPath, modelTemplate);
  console.log(`✅ Model ${modelName} added to schema.prisma`);

  try {
    execSync("npx prisma generate", { stdio: "inherit" });
    console.log("✅ Prisma client updated");
  } catch (error) {
    console.error("⚠️ Failed to run prisma generate");
  }
}
