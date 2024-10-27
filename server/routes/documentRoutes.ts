import express from 'express';
const router = express.Router();
import {createDocument,getDocument} from "../controllers/documentController";

router.get('/:level',getDocument);

router.post('/',createDocument);

export default router;