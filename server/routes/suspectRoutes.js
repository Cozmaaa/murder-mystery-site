const express = require("express");
const router = express.Router();
const suspectController = require("../controllers/suspectController");

router.get('/:level',suspectController.getSuspect)

router.post("/", suspectController.createSuspect);

module.exports = router;
