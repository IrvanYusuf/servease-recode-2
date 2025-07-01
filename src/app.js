import "module-alias/register.js";
import dotenv from "dotenv";
import express from "express";
import connectDb from "@/database/db.js";
import apiEndpoints from "@/routes/index.js";
import cors from "cors";

dotenv.config();

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();
app.get("/", (req, res) => {
  res.send("halo");
});
app.use("/api", apiEndpoints);

export default app;
