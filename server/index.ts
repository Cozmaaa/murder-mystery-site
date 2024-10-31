import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
require("dotenv").config();
import documentRouter from "./routes/documentRoutes";
import suspectRouter from "./routes/suspectRoutes";
import suspectChattingRoutes from "./routes/suspectChattingRoutes";
import caseRoutes from "./routes/caseRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/documents", documentRouter);
app.use("/api/suspects", suspectRouter);
app.use("/api/response", suspectChattingRoutes);
app.use("/api/case/",caseRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI is not defined in the environment variables");
}

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Murder Mystery API" });
});

// Port from environment or default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
