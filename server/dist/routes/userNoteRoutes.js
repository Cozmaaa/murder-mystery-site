"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userNoteController_1 = require("../controllers/userNoteController");
const router = express_1.default.Router();
router.post("/getUserNote", userNoteController_1.getUserNote);
router.post("/editUserNote", userNoteController_1.editUserNote);
exports.default = router;
