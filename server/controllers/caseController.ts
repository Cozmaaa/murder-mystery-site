import { Request, Response } from "express";
import CaseModel from "../models/caseModel";

interface ICase {
  name: string;
  imageName: string;
  level: number;
  description: string;
  hints: string[];
}

export const createCase = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {
    const { name, imageName, level, description, hints } = req.body as ICase;

    const existingCase = await CaseModel.findOne({ level });

    if (existingCase) {
      res.status(400).send("This document already exists");
      return;
    }

    const newCase = new CaseModel({
      name,
      imageName,
      level,
      description,
      hints

    })
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error during adding a new document");
  }
};


export const addHint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { hints, level } = req.body as ICase;
    const existingCase = await CaseModel.findOneAndUpdate({ level }, { $push: { hints: hints } }, { new: true })


    res.status(200).send(`Added hints to the new case${existingCase}`)
  } catch (error) {
    console.log(error)
    res.status(500).send("Server error during adding a new hint to the case")
  }

}

export const getAllCases = async (req: Request, res: Response): Promise<void> => {
  try {
    let allCases = await CaseModel.find({});

    const modifiedCases = allCases.map((doc) => ({
      ...doc.toObject(),
      imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${doc.level}/${doc.imageName}.webp`,
    }));


    res.json(modifiedCases);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error during fetching all documents");
  }
}

export const getCaseDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { level } = req.body;

    const existingCase = await CaseModel.findOne({ level });
    if (!existingCase) {
      res.status(404).send('Document not found');
      return;
    }

    const imageUrl = `${process.env.BASE_URL}/public/levels/${level}/${existingCase.imageName}.webp`;
    const caseDetails = {
      ...existingCase.toObject(),
      imageUrl,
    };

    res.json(caseDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error during fetching a document');
  }
};
