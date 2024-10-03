const express =require('express');
const {generateResponse} =require ('../controllers/suspectChattingController');

const router = express.Router();

router.post('/generate-suspect-response',generateResponse);

module.exports = router;