const Suspect = require("../models/suspectModel");

exports.createSuspect = async (req, res) => {
  try {
    const { name, faceImage, level, prompt } = req.body;

    const existingSuspect = await Suspect.findOne({ name: name, level: level });
    if (existingSuspect) {
      return res.status(400).send("This suspect already exists");
    }

    const newSuspect = new Suspect({ name, faceImage, level, prompt });
    await newSuspect.save();

    res.status(201).json(newSuspect);
  } catch (error) {
    res.status(500).send("Server error during adding a new suspect");
  }
};

exports.getSuspect = async (req, res) => {
  try {
    const { level } = req.params;

    const suspect = await Suspect.find({ level });
    if (!suspect) {
      res.status(404).send("Document does not exist");
    }

    const modifiedSuspects = suspect.map((sus) => ({
      ...sus._doc,
      imageUrl: `${req.protocol}://${req.get("host")}/public/levels/${level}/${
        sus.faceImage
      }.webp`,
    }));
    res.json(modifiedSuspects);
  } catch (error) {
    res.status(500).send("Server error while fetching Suspect");
  }
};
