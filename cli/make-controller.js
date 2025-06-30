import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ambil argumen: path + options
const args = process.argv.slice(2);
const input = args[0]; // v1/posts

if (!input) {
  console.error(
    "❌ Usage: npm run make:controller v1/posts [--type=class|function]"
  );
  process.exit(1);
}

// Cek opsi --type
let type = "class"; // default
const typeArg = args.find((arg) => arg.startsWith("--type="));
if (typeArg) {
  const [, value] = typeArg.split("=");
  if (["class", "function"].includes(value)) {
    type = value;
  } else {
    console.error("❌ Invalid --type value. Use 'class' or 'function'");
    process.exit(1);
  }
}

// Path parsing
const parts = input.split("/");
const rawName = parts.pop(); // posts
const versionAndDir = parts.join("/"); // v1

const className = `${
  rawName.charAt(0).toUpperCase() + rawName.slice(1)
}Controller`;
const fileName = `${rawName.toLowerCase()}.controller.js`;
const basePath = path.resolve(__dirname, "../src/controllers", versionAndDir);
const filePath = path.join(basePath, fileName);

// Template
let content = "";

if (type === "class") {
  content = `import { StatusCodes } from "http-status-codes";
  class ${className} {
  static exampleMethod = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };
}

export default ${className};
`;
} else {
  // function-based
  content = `import { StatusCodes } from "http-status-codes";
  const exampleMethod = async (req, res) => {
  try {
    // IMPLEMENT VALIDATION HERE

    // LOGIC APP
    res.status(StatusCodes.OK).json({ message: "Function-based controller hit!" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

export default {
  exampleMethod,
};
`;
}

// Buat folder kalau belum ada
fs.mkdirSync(basePath, { recursive: true });

// Cegah overwrite
if (fs.existsSync(filePath)) {
  console.error(`❌ File already exists at: ${filePath}`);
  process.exit(1);
}

// Simpan
fs.writeFileSync(filePath, content);
console.log(
  `✅ ${
    type === "class" ? "Class" : "Function"
  } controller created at: src/controllers/${versionAndDir}/${fileName}`
);
