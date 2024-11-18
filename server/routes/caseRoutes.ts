import express from 'express';
import {createCase,getAllCases,getCaseDetails} from "../controllers/caseController";
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/createCase',authenticateToken,createCase);
router.post('/getCase',authenticateToken,getCaseDetails);

router.get('/',authenticateToken,getAllCases);

export default router;
