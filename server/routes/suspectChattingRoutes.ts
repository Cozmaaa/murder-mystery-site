import express from 'express'
import { generateResponse } from '../controllers/suspectChattingController';

const router = express.Router();

router.post('/generate-suspect-response',generateResponse);

export default router;