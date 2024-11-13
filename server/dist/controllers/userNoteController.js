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
exports.getUserNote = exports.editUserNote = exports.createUserNote = void 0;
const userNoteModel_1 = __importDefault(require("../models/userNoteModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const createUserNote = (user, caseLevel, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserNote = new userNoteModel_1.default({
            userId: user._id,
            caseLevel: caseLevel,
            content: content,
        });
        yield newUserNote.save();
        return newUserNote;
    }
    catch (error) {
        throw new Error("Server error during adding a new user note");
    }
});
exports.createUserNote = createUserNote;
const editUserNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies.token;
        const { caseLevel, content } = req.body;
        if (!cookie) {
            res.status(401).send("Unauthorized");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(cookie, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const updatedNote = yield userNoteModel_1.default.findOneAndUpdate({ userId: user._id, caseLevel: caseLevel }, { content: content }, { new: true });
        if (!updatedNote) {
            const newNote = yield (0, exports.createUserNote)(user, caseLevel, content);
            res.status(201).json(newNote);
            return;
        }
        res.status(200).send("User note updated successfully");
    }
    catch (error) {
        res.status(500).send("Server error during updating user note");
    }
});
exports.editUserNote = editUserNote;
const getUserNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { caseLevel } = req.body;
        const cookie = req.cookies.token;
        if (!cookie) {
            res.status(401).send("Unauthorized");
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(cookie, process.env.JWT_SECRET);
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        const userNote = yield userNoteModel_1.default.findOne({
            userId: user._id,
            caseLevel: caseLevel,
        });
        if (!userNote) {
            res.status(404).send("User note not found");
            return;
        }
        res.status(200).json(userNote);
    }
    catch (error) {
        res.status(500).send("Server error during fetching user note");
    }
});
exports.getUserNote = getUserNote;
