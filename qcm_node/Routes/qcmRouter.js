const express=require('express')
const router=express.Router();
const qcmController = require('../Controllers/qcmController'); // Update the path

router.post('/Admin/create-qcm', qcmController.createQCM);

module.exports = router;
