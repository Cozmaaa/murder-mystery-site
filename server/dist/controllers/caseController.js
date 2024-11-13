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
exports.getAllCases = exports.createCase = void 0;
const caseModel_1 = __importDefault(require("../models/caseModel"));
const createCase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageName, level, description } = req.body;
        const existingCase = yield caseModel_1.default.findOne({ level });
        if (existingCase) {
            res.status(400).send("This document already exists");
            return;
        }
        const newCase = new caseModel_1.default({
            name,
            imageName,
            level,
            description,
        });
        yield newCase.save();
        res.status(201).json(newCase);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error during adding a new document");
    }
});
exports.createCase = createCase;
const getAllCases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allCases = yield caseModel_1.default.find({});
        const modifiedCases = allCases.map((doc) => (Object.assign(Object.assign({}, doc.toObject()), { imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${doc.level}/${doc.imageName}.webp` })));
        res.json(modifiedCases);
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error during fetching all documents");
    }
});
exports.getAllCases = getAllCases;
