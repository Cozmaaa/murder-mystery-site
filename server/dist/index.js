"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("dotenv").config();
require("./config/passport");
const documentRoutes_1 = __importDefault(require("./routes/documentRoutes"));
const suspectRoutes_1 = __importDefault(require("./routes/suspectRoutes"));
const suspectChattingRoutes_1 = __importDefault(require("./routes/suspectChattingRoutes"));
const caseRoutes_1 = __importDefault(require("./routes/caseRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userNoteRoutes_1 = __importDefault(require("./routes/userNoteRoutes"));
const app = (0, express_1.default)();
// Middleware
const allowedOrigins = [
    "http://localhost:3000",
    "https://murder-mystery-site-git-main-cozmaaas-projects.vercel.app",
    "https://murder-mystery-site.onrender.com",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "defaultParola",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        sameSite: "lax", // 'lax' allows some cross-origin requests
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/documents", documentRoutes_1.default);
app.use("/api/suspects", suspectRoutes_1.default);
app.use("/api/response", suspectChattingRoutes_1.default);
app.use("/api/case/", caseRoutes_1.default);
app.use("/api/user/", authRoutes_1.default);
app.use("/api/userNote", userNoteRoutes_1.default);
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "public")));
if (!process.env.DATABASE_URI) {
    throw new Error("DATABASE_URI is not defined in the environment variables");
}
mongoose_1.default
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
