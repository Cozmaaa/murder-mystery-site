import express from 'express';
const router = express.Router();
import {createDocument,getDocument} from "../controllers/documentController";
import { authenticateToken } from '../middleware/authMiddleware';

router.get('/:level',authenticateToken,getDocument);

router.post('/',createDocument);

export default router;