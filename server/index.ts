import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import path from "path";
// import session from "express-session";
require("dotenv").config();
import "./config/passport";
import documentRouter from "./routes/documentRoutes";
import suspectRouter from "./routes/suspectRoutes";
import suspectChattingRoutes from "./routes/suspectChattingRoutes";
import caseRoutes from "./routes/caseRoutes";
import authRoutes from "./routes/authRoutes";
import userNoteRoutes from "./routes/userNoteRoutes";
import purchaseRoutes from "./routes/purchaseRoutes";
import { handleWebhook } from "./controllers/webhook";

const app = express();


app.use(
  cors({
    origin: function (origin, callback) {
      console.log("CORS request from:", origin);
      if (!origin || origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")||origin.endsWith("localhost:3000")) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.post("/webhook",express.raw({type:"application/json"}),handleWebhook);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "defaultParola",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true, // Set to true if using HTTPS
//       sameSite: "none", // 'lax' allows some cross-origin requests
//     },
//   })
// );

app.use("/api/documents", documentRouter);
app.use("/api/suspects", suspectRouter);
app.use("/api/response", suspectChattingRoutes);
app.use("/api/case/", caseRoutes);
app.use("/api/user/", authRoutes);
app.use("/api/userNote",userNoteRoutes)
app.use("/api/checkout", purchaseRoutes);
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
