import express from 'express';
const router = express.Router();
import {createCase,getAllCases} from "../controllers/caseController";
import {isAuthentificated} from "../middleware/authMiddleware";

router.post('/createCase',createCase);

router.get('/',isAuthentificated,getAllCases);

export default router;
