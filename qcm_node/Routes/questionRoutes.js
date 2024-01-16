const express = require('express');
const router = express.Router();
const questionController = require('../Controllers/questionController');

// Route to add a new question
router.post('/add', questionController.addQuestion);
router.get('/getQuestionsByQcmId/:qcmId', questionController.getQuestionsByQcmId);


module.exports = router;
