const express = require('express');
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get('/:level',documentController.getDocument);

router.post('/',documentController.createDocument);

module.exports = router;