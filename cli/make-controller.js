const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Table = require("cli-table3");

// Ambil argumen: path + options
const args = process.argv.slice(2);
const input = args[0]; // v1/posts

// Jika --help atau -h
if (input === "--help" || input === "-h") {
  console.log(chalk.bold.green("\n🛠  make:controller CLI Help\n"));

  console.log(chalk.bold("Usage:"));
  console.log(
    "  " +
      chalk.cyan("npm run make:controller") +
      " " +
      chalk.yellow("<path>") +
      " -- [--type=class|function] [--resource]"
  );
  console.log("");

  console.log(chalk.bold("Examples:"));
  console.log("  " + chalk.cyan("npm run make:controller auth"));
  console.log(
    "  " + chalk.cyan("npm run make:controller v1/post -- --type=function")
  );
  console.log(
    "  " + chalk.cyan("npm run make:controller v1/user -- --resource")
  );
  console.log(
    "  " +
      chalk.cyan(
        "npm run make:controller v1/comment -- --type=class --resource"
      )
  );
  console.log("");

  const optionTable = new Table({
    head: [chalk.bold("Option"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  optionTable.push(["--help, -h", "Show this help message"]);
  optionTable.push([
    "--type=class",
    "Generate a controller using class-based style (default)",
  ]);
  optionTable.push([
    "--type=function",
    "Generate a controller using function-based style",
  ]);
  optionTable.push([
    "--resource",
    "Generate resource methods: index, store, show, destroy",
  ]);

  console.log(chalk.bold("Options:"));
  console.log(optionTable.toString());
  console.log("");

  const outputTable = new Table({
    head: [chalk.bold("Output Structure"), chalk.bold("Description")],
    colWidths: [30, 60],
  });

  outputTable.push(["index", "Return list of resources (GET /)"]);
  outputTable.push(["store", "Store new resource (POST /)"]);
  outputTable.push(["show", "Get single resource detail (GET /:id)"]);
  outputTable.push(["destroy", "Delete resource (DELETE /:id)"]);

  console.log(chalk.bold("Output Methods (when using --resource):"));
  console.log(outputTable.toString());
  console.log("");

  console.log(chalk.bold("Output Location:"));
  console.log(
    "  " + chalk.yellow("src/controllers/<path>/<name>.controller.js")
  );
  console.log("");
  console.log(chalk.bold("Example Output Location:"));
  console.log("  " + chalk.yellow("src/controllers/auth.controller.js"));
  console.log("  " + chalk.yellow("src/controllers/v1/post.controller.js"));
  console.log("");

  process.exit(0);
}

if (!input || input.startsWith("--")) {
  console.error("❌ Invalid or missing controller path.");
  console.error(
    "Usage: npm run make:controller v1/posts -- [--type=class|function] [--resource]"
  );
  process.exit(1);
}

// laravel controller resource
// php artisan make:controller sharkController --resource

// Cek opsi --type
let type = "class"; // default
let resource = false; // default
const typeArg = args.find((arg) => arg.startsWith("--type="));

const resourceArg = args.find((arg) => arg.startsWith("--resource"));

if (typeArg && resourceArg) {
  const [, value] = typeArg.split("=");
  if (["class", "function"].includes(value)) {
    type = value;
    resource = true;
    // console.log("resource and type");
  } else {
    console.error("❌ Invalid --type value. Use 'class' or 'function'");
    process.exit(1);
  }
} else if (typeArg) {
  const [, value] = typeArg.split("=");
  if (["class", "function"].includes(value)) {
    type = value;
    resource = false;
    // console.log("only type");
    // console.log(type);
  } else {
    console.error("❌ Invalid --type value. Use 'class' or 'function'");
    process.exit(1);
  }
} else if (resourceArg) {
  resource = true;
  // console.log("only resource");
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

// // Template
let content = "";

if (type === "class" && resource) {
  content = `const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
class ${className} {
  static index = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };

  static store = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success store data",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };

  static show = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success get detail",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };

  static destroy = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success delete",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };
}

module.exports = ${className};
`;
} else if (type === "function" && resource) {
  content = `const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");
const index = async (req, res) => {
  try {
    // IMPLEMENT VALIDATION HERE

    // LOGIC APP
    return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
  } catch (error) {
    console.error(error);
    return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
  }
};

const store = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success store data",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
};

const show = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success get detail",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
};

const destroy = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success delete",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
};

module.exports = {
  index,
  store,
  show,
  destroy
};
`;
} else if (type === "class") {
  content = `const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");  
class ${className} {
  static index = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
    } catch (error) {
      console.error(error);
      return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    }
  };
}

module.exports = ${className};
`;
} else {
  // function-based
  content = `const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("@/utils/response.js");  
const index = async (req, res) => {
  try {
    // IMPLEMENT VALIDATION HERE

    // LOGIC APP
    return ApiResponse.successResponse(res,"success",data,null,StatusCodes.CREATED);
  } catch (error) {
    console.error(error);
    return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
  }
};

module.exports = {
  index,
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
