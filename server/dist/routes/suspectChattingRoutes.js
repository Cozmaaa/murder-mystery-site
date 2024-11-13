"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suspectChattingController_1 = require("../controllers/suspectChattingController");
const router = express_1.default.Router();
router.post('/generate-suspect-response', suspectChattingController_1.generateResponse);
exports.default = router;
