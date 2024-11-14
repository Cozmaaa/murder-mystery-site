import express, { Request, Response } from "express";
import {
  signUp,
  login,
  logout,
  addAccesibleCases,
  getAccesibleCases,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/addAccesibleCases", authenticateToken, addAccesibleCases);
router.get("/getAccesibleCases", authenticateToken, getAccesibleCases);

router.get("/status", authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ authenticated: true, user: (req as any).user });
});

export default router;
