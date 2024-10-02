const Document = require("../models/documentModel");

exports.createDocument = async (req, res) => {
  try {
    const { name, imageName, level, description } = req.body;

    const existingDocument = await Document.findOne({ name });
    if (existingDocument) {
      return res.status(400).send("This document already exists");
    }

    const newDocument = new Document({ name, imageName, level, description });
    await newDocument.save();

    res.status(201).json(newDocument);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error during adding a new document");
  }
};

exports.getDocument = async (req, res) => {
  try {
    const { level } = req.params;
    console.log(level);

    const document = await Document.find({ level:level });
    if (!document) {
      return res.status(404).send("Document does not exist");
    }

    const modifiedDocuments = document.map((doc) => ({
        ...doc._doc,
        imageUrl: `${req.protocol}://${req.get('host')}/public/levels/${level}/${doc.imageName}.webp`
      }));

    res.json(modifiedDocuments);
  } catch (error) {
    res.status(500).send("Server error while fetching Document");
  }
};
