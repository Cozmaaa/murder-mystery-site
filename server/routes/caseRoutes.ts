import express from 'express';
const router = express.Router();
import {createCase,getAllCases} from "../controllers/caseController";

router.post('/createCase',createCase);

router.get('/',getAllCases);

export default router;
