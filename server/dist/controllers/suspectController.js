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
exports.getSuspect = exports.createSuspect = void 0;
const suspectModel_1 = __importDefault(require("../models/suspectModel"));
const createSuspect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, faceImage, level, isGuilty, prompt } = req.body;
        const existingSuspect = yield suspectModel_1.default.findOne({ name, level });
        if (existingSuspect) {
            res.status(400).send("This suspect already exists");
            return;
        }
        const newSuspect = new suspectModel_1.default({ name, faceImage, level, isGuilty, prompt });
        yield newSuspect.save();
        res.status(201).json(newSuspect);
        return;
    }
    catch (error) {
        res.status(500).send("Server error during adding a new suspect");
        return;
    }
});
exports.createSuspect = createSuspect;
const getSuspect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level } = req.params;
        const suspects = yield suspectModel_1.default.find({ level: Number(level) });
        if (!suspects || suspects.length === 0) {
            res.status(404).send("Document does not exist");
            return;
        }
        const modifiedSuspects = suspects.map((sus) => (Object.assign(Object.assign({}, sus.toObject()), { imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${level}/${sus.faceImage}.webp` })));
        res.status(200).json(modifiedSuspects);
        return;
    }
    catch (error) {
        res.status(500).send("Server error during fetching suspects");
        return;
    }
});
exports.getSuspect = getSuspect;
