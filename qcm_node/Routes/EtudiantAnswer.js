const express = require('express');
const router = express.Router();
const EtudiantAnswerController = require('../Controllers/EtudiantAnswerController');


// Etudiant-specific routes
router.get('/qcm-results', EtudiantAnswerController.getQCMResults);


module.exports = router;
