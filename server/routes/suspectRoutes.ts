import express from "express";
import { getSuspect, createSuspect } from "../controllers/suspectController";

const router = express.Router();

router.get('/:level', getSuspect);

router.post("/", createSuspect);

export default router;