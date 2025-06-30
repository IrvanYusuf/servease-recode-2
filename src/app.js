import dotenv from "dotenv";
import express from "express";
import connectDb from "@/database/db.js";
import apiV1 from "@/routes/v1/index.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3300;

connectDb();
app.get("/", (req, res) => {
  res.send("halo");
});
app.use("/api/v1", apiV1);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
