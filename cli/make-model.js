#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbProvider = process.env.DB_PROVIDER;

const args = process.argv.slice(2);
const modelName = args[0];

if (!modelName) {
  console.error("❌ Model name is required.\nUsage: npm run make:model User");
  process.exit(1);
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
  const template = `import { model, Schema } from "mongoose";
  
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

export const ${modelNameCapitalize} = model("${modelNameCapitalize}", ${modelNameMongo}Schema);  
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
