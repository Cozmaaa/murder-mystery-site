import express, { Request, Response } from "express";

const router = express.Router();

import { signUp, login,logout} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";


router.post("/signup", signUp);
router.post("/login", login);
router.post('/logout', logout);

router.get('/status', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ authenticated: true, user: req.user });
});



export default router;
