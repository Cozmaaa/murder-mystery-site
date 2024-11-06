import express from 'express';
import {createCase,getAllCases} from "../controllers/caseController";
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/createCase',authenticateToken,createCase);

router.get('/',authenticateToken,getAllCases);

export default router;
