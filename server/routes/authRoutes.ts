import express, { Request, Response } from "express";

const router = express.Router();

import { signUp, login,logout,addAccesibleCases,getAccesibleCases} from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";


router.post("/signup", signUp);
router.post("/login", login);
router.post('/logout', logout);
router.post('/addAccesibleCases',addAccesibleCases);
router.get('/getAccesibleCases',getAccesibleCases);

router.get('/status', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json({ authenticated: true, user: req.user });
});





export default router;
