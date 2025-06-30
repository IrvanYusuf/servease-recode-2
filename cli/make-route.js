import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil argumen: path + options
const args = process.argv.slice(2);
const input = args[0]; // v1/posts

if (!input) {
  console.error("❌ Usage: npm run make:route v1/User");
  process.exit(1);
}

const parts = input.split("/");
const rawName = parts.pop(); // User
const dirPath = parts.join("/"); // v1

const kebabName = rawName.toLowerCase();
const routeFileName = `${kebabName}.route.js`;
const controllerName = `${
  rawName.charAt(0).toUpperCase() + rawName.slice(1)
}Controller`;
const routePath = path.resolve(__dirname, "../src/routes", dirPath);
const filePath = path.join(routePath, routeFileName);

const indexFilePath = path.join(routePath, "index.js");

// Template isi route
const content = `import express from "express"

const router = express.Router();

export default router;
`;

// Buat folder jika belum ada
fs.mkdirSync(routePath, { recursive: true });

// Cegah overwrite
if (fs.existsSync(filePath)) {
  console.error(
    `❌ Route already exists at: src/routes/${dirPath}/${routeFileName}`
  );
  process.exit(1);
}

fs.writeFileSync(filePath, content);

let indexContent = "";

if (!fs.existsSync(indexFilePath)) {
  // Jika index.js belum ada, buat baru
  indexContent = `import express from "express";
import ${kebabName}Routes from "./${routeFileName}";

const router = express.Router();

router.use("/${kebabName}s", ${kebabName}Routes);

export default router;
`;
  fs.writeFileSync(indexFilePath, indexContent);
  console.log(`✅ index.js created at: src/routes/${dirPath}/index.js`);
} else {
  // Jika sudah ada, tambahkan import + router.use jika belum ada
  indexContent = fs.readFileSync(indexFilePath, "utf-8");

  const importLine = `import ${kebabName}Routes from "./${routeFileName}";`;
  const useLine = `router.use("/${kebabName}s", ${kebabName}Routes);`;

  if (!indexContent.includes(importLine)) {
    const lines = indexContent.split("\n");

    // Sisipkan import setelah express
    const expressIndex = lines.findIndex((line) =>
      line.startsWith("import express")
    );
    lines.splice(expressIndex + 1, 0, importLine);

    // Tambahkan router.use sebelum export
    const exportIndex = lines.findIndex((line) =>
      line.includes("export default router")
    );
    lines.splice(exportIndex, 0, useLine);

    fs.writeFileSync(indexFilePath, lines.join("\n"));
    console.log(`✅ Route registered in: src/routes/${dirPath}/index.js`);
  } else {
    console.log("⚠️  Route already registered in index.js");
  }
}
console.log(`✅ Route created at: src/routes/${dirPath}/${routeFileName}`);
