"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/signup', userController_1.signUp);
router.post('/login', userController_1.login);
router.post('/logout', userController_1.logout);
router.post('/addAccesibleCases', authMiddleware_1.authenticateToken, userController_1.addAccesibleCases);
router.get('/getAccesibleCases', authMiddleware_1.authenticateToken, userController_1.getAccesibleCases);
router.get('/status', authMiddleware_1.authenticateToken, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});
exports.default = router;
