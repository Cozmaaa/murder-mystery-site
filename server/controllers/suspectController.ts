import { Request, Response } from "express";
import Suspect from "../models/suspectModel";
import { Document } from "mongoose";

interface ISuspect {
  name: string;
  faceImage: string;
  level: number;
  isGuilty: boolean;
  prompt: string;
}

export const createSuspect = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, faceImage, level, isGuilty, prompt } = req.body as ISuspect;

    const existingSuspect = await Suspect.findOne({ name, level });
    if (existingSuspect) {
      res.status(400).send("This suspect already exists");
      return;
    }

    const newSuspect = new Suspect({ name, faceImage, level, isGuilty, prompt });
    await newSuspect.save();

    res.status(201).json(newSuspect);
    return;
  } catch (error) {
    res.status(500).send("Server error during adding a new suspect");
    return;
  }
};

export const getSuspect = async (req: Request, res: Response): Promise<void> => {
  try {
    const { level } = req.params as { level: string };

    const suspects = await Suspect.find({ level: Number(level) });
    if (!suspects || suspects.length === 0) {
      res.status(404).send("Document does not exist");
      return;
    }

    const modifiedSuspects = suspects.map((sus: Document & ISuspect) => ({
      ...sus.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${level}/${sus.faceImage}.webp`,
    }));

    res.status(200).json(modifiedSuspects);
    return;
  } catch (error) {
    res.status(500).send("Server error during fetching suspects");
    return;
  }
};