"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
router.post("/signup", userController_1.signUp);
router.post("/login", userController_1.login);
router.post('/logout', userController_1.logout);
router.post('/addAccesibleCases', userController_1.addAccesibleCases);
router.get('/getAccesibleCases', userController_1.getAccesibleCases);
router.get('/status', authMiddleware_1.authenticateToken, (req, res) => {
    res.status(200).json({ authenticated: true, user: req.user });
});
exports.default = router;
