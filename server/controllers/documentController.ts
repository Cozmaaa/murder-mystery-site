import { Request, Response } from "express";
import DocumentModel from "../models/documentModel";

interface IDocument {
  name: string;
  imageName: string;
  level: number;
  description: string;
}

export const createDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, imageName, level, description } = req.body as IDocument;

    const existingDocument = await DocumentModel.findOne({ name });
    if (existingDocument) {
      res.status(400).send("This document already exists");
      return;
    }

    const newDocument = new DocumentModel({
      name,
      imageName,
      level,
      description,
    });
    await newDocument.save();

    res.status(201).json(newDocument);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error during adding a new document");
  }
};

export const getDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { level } = req.params;
    console.log(level);

    const document = await DocumentModel.find({ level: level });
    if (!document) {
      res.status(404).send("Document does not exist");
      return;
    }

    const modifiedDocuments = document.map((doc) => ({
      ...doc._doc,
      imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${level}/${
        doc.imageName
      }.webp`,
    }));


    for(let i =0 ;i<modifiedDocuments.length;i++){
      if(modifiedDocuments[i].imageName==='initialFile'){
        let buffer = modifiedDocuments[0];
        modifiedDocuments[0]=modifiedDocuments[i];
        modifiedDocuments[i]=buffer;
        break;
      }
    }



    res.json(modifiedDocuments);
  } catch (error) {
    res.status(500).send("Server error while fetching Document");
  }
};
