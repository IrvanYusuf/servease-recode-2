import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil argumen: middleware
const args = process.argv.slice(2);
const input = args[0]; // auth

if (!input) {
  console.error("❌ Usage: npm run make:middleware <name>");
  process.exit(1);
}

const fileName = `${input.toLowerCase()}.middleware.js`;
const functionName = `${input.toLowerCase()}Middleware`;
const filePath = path.resolve(__dirname, `../src/middlewares/${fileName}`);

// Template isi file
const content = `const ${functionName} = (req, res, next) => {
  // TODO: Implement ${input} middleware logic
  next();
};

export default ${functionName};
`;

// Cegah overwrite
if (fs.existsSync(filePath)) {
  console.error(`❌ Middleware already exists: src/middlewares/${fileName}`);
  process.exit(1);
}

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);
console.log(`✅ Middleware created at: src/middlewares/${fileName}`);
