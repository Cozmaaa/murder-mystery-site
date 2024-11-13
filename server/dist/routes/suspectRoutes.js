"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suspectController_1 = require("../controllers/suspectController");
const router = express_1.default.Router();
router.get('/:level', suspectController_1.getSuspect);
router.post("/", suspectController_1.createSuspect);
exports.default = router;
