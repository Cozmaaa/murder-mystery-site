"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccesibleCases = exports.addAccesibleCases = exports.logout = exports.login = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import passport from "passport";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUsername = yield userModel_1.default.findOne({ username })
            .collation({ locale: "en", strength: 2 })
            .exec();
        if (existingUsername) {
            throw (0, http_errors_1.default)(409, "Username already taken");
        }
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield userModel_1.default.create({
            username,
            displayName: username,
            email,
            password: passwordHashed,
        });
        yield newUser.save();
        const payload = {
            id: newUser._id,
            username: newUser.username,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // Set the JWT as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: "none",
        });
        res.status(201).json({ message: "User registered and logged in" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ username }).select("+password");
        if (!user) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        if (!user.password) {
            res.status(401).json({ message: "Password is not set" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        const payload = {
            id: user._id,
            username: user.username,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "none",
        });
        res.json({ message: "User logged in" });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};
exports.logout = logout;
const addAccesibleCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, addedLevel } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(userId, { $addToSet: { accesibleCases: addedLevel } }, // Add without duplicates
        { new: true, runValidators: false } // Disable validators for this update
        );
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send("Level added successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error during adding a new level");
    }
});
exports.addAccesibleCases = addAccesibleCases;
const getAccesibleCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send("Unauthorized");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const accesibleCases = user.accesibleCases;
        res.json(accesibleCases);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error during fetching accesible levels");
    }
});
exports.getAccesibleCases = getAccesibleCases;
