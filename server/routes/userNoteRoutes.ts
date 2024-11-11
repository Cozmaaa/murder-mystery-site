import express from "express";
import {getUserNote,editUserNote} from "../controllers/userNoteController";

const router = express.Router();


router.post("/getUserNote", getUserNote);
router.post("/editUserNote", editUserNote);

export default router;