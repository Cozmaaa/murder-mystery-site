import { Request, Response } from "express";
import UserNote from "../models/userNoteModel";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

interface IUserNote {
  userId: string;
  caseLevel: number;
  content: string;
}

export const createUserNote = async (
  user: any,
  caseLevel: number,
  content: string
): Promise<any> => {
  try {
    const newUserNote = new UserNote({
      userId: user._id,
      caseLevel: caseLevel,
      content: content,
    });
    await newUserNote.save();
    return newUserNote;
  } catch (error) {
    throw new Error("Server error during adding a new user note");
  }
};

export const editUserNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cookie = req.cookies.token;
    const { caseLevel, content } = req.body;

    if (!cookie) {
      res.status(401).send("Unauthorized");
      return;
    }

    const decoded: any = jwt.verify(cookie, process.env.JWT_SECRET as string);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const updatedNote = await UserNote.findOneAndUpdate(
      { userId: user._id, caseLevel: caseLevel },
      { content: content },
      { new: true }
    );

    if (!updatedNote) {
      const newNote = await createUserNote(user, caseLevel, content);
      res.status(201).json(newNote);
      return;
    }

    res.status(200).send("User note updated successfully");
  } catch (error) {
    res.status(500).send("Server error during updating user note");
  }
};

export const getUserNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { caseLevel } = req.body;
    const cookie = req.cookies.token;

    if (!cookie) {
      res.status(401).send("Unauthorized");
      return;
    }

    const decoded: any = jwt.verify(cookie, process.env.JWT_SECRET as string);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const userNote = await UserNote.findOne({
      userId: user._id,
      caseLevel: caseLevel,
    });
    if (!userNote) {
      res.status(404).send("User note not found");
      return;
    }
    res.status(200).json(userNote);
  } catch (error) {
    res.status(500).send("Server error during fetching user note");
  }
};
