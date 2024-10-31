import { Request, Response } from "express";
import CaseModel from "../models/caseModel";

interface ICase{
    name: string;
    imageName: string;
    level: number;
    description: string;

}

export const createCase = async (
  req: Request,
  res: Response
): Promise<void> => {

    try{
        const { name, imageName, level, description } = req.body as ICase;

    const existingCase = await CaseModel.findOne({ level });

    if(existingCase){
        res.status(400).send("This document already exists");
        return;
    }

        const newCase = new CaseModel({
            name,
            imageName,
            level,
            description,
        
        })
        await newCase.save();
        res.status(201).json(newCase);
    }catch(error){
        console.log(error);
        res.status(500).send("Server error during adding a new document");
    }
};


export const getAllCases = async (req:Request,res:Response):Promise<void>=>{
    try{
        let allCases = await CaseModel.find({});
        
        const modifiedCases = allCases.map((doc) => ({
            ...doc.toObject(),
            imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${doc.level}/${doc.imageName}.webp`,
          }));
      

        res.json(modifiedCases);
        return;
    }catch(error){
        console.log(error);
        res.status(500).send("Server error during fetching all documents");
    }
}