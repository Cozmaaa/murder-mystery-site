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
exports.getDocument = exports.createDocument = void 0;
const documentModel_1 = __importDefault(require("../models/documentModel"));
const createDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, imageName, level, description } = req.body;
        const existingDocument = yield documentModel_1.default.findOne({ name });
        if (existingDocument) {
            res.status(400).send("This document already exists");
            return;
        }
        const newDocument = new documentModel_1.default({
            name,
            imageName,
            level,
            description,
        });
        yield newDocument.save();
        res.status(201).json(newDocument);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server error during adding a new document");
    }
});
exports.createDocument = createDocument;
const getDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level } = req.params;
        console.log(level);
        const document = yield documentModel_1.default.find({ level: level });
        if (!document) {
            res.status(404).send("Document does not exist");
            return;
        }
        const modifiedDocuments = document.map((doc) => (Object.assign(Object.assign({}, doc._doc), { imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${level}/${doc.imageName}.webp` })));
        for (let i = 0; i < modifiedDocuments.length; i++) {
            if (modifiedDocuments[i].imageName === 'initialFile') {
                let buffer = modifiedDocuments[0];
                modifiedDocuments[0] = modifiedDocuments[i];
                modifiedDocuments[i] = buffer;
                break;
            }
        }
        res.json(modifiedDocuments);
    }
    catch (error) {
        res.status(500).send("Server error while fetching Document");
    }
});
exports.getDocument = getDocument;
