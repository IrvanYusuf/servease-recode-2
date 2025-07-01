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
  content = `import { StatusCodes } from "http-status-codes";
class ${className} {
  static index = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };

  static store = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success store data",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };

  static show = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success get detail",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };

  static destroy = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success delete",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };
}

export default ${className};
`;
} else if (type === "function" && resource) {
  content = `import { StatusCodes } from "http-status-codes";
const index = async (req, res) => {
  try {
    // IMPLEMENT VALIDATION HERE

    // LOGIC APP
    // you can use class ApiResponse.successResponse() from utils/response.js
    //  return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
    res.status(StatusCodes.OK).json({ message: "Function-based controller hit!" });
  } catch (error) {
    console.error(error);
    // you can use class ApiResponse.errorResponse() from utils/response.js
    // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const store = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success store data",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

const show = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success get detail",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

const destroy = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success delete",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
};

export default {
  index,
  store,
  show,
  destroy
};
`;
} else if (type === "class") {
  content = `import { StatusCodes } from "http-status-codes";
class ${className} {
  static index = async (req, res) => {
    try {
      // IMPLEMENT VALIDATION HERE

      // LOGIC APP
      // you can use class ApiResponse.successResponse() from utils/response.js
      //  return ApiResponse.successResponse(res,"success get datas",data,null,StatusCodes.CREATED);
      res.status(StatusCodes.OK).json({ message: "${className} exampleMethod hit!" });
    } catch (error) {
      console.error(error);
      // you can use class ApiResponse.errorResponse() from utils/response.js
      // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  };
}

export default ${className};
`;
} else {
  // function-based
  content = `import { StatusCodes } from "http-status-codes";
const index = async (req, res) => {
  try {
    // IMPLEMENT VALIDATION HERE

    // LOGIC APP
    // you can use class ApiResponse.successResponse() from utils/response.js
    //  return ApiResponse.successResponse(res,"success",data,null,StatusCodes.CREATED);
    res.status(StatusCodes.OK).json({ message: "Function-based controller hit!" });
  } catch (error) {
    console.error(error);
    // you can use class ApiResponse.errorResponse() from utils/response.js
    // return ApiResponse.errorResponse(res, "Internal server error", { server: error.message});
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

export default {
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
