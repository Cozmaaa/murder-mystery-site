"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const caseController_1 = require("../controllers/caseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/createCase', authMiddleware_1.authenticateToken, caseController_1.createCase);
router.get('/', authMiddleware_1.authenticateToken, caseController_1.getAllCases);
exports.default = router;
