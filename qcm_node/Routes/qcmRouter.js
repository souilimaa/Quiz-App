<<<<<<< HEAD
const express=require('express')
const router=express.Router();
const qcmController = require('../Controllers/qcmController'); // Update the path

router.post('/Admin/create-qcm', qcmController.createQCM);

module.exports = router;
=======
const express=require('express');
const qcmRouter=express.Router();
const qcmController=require('../Controllers/qcmController')
qcmRouter.route('/createQcm')
.get();

qcmRouter.route('/getQcms')
.get(qcmController.getQcms)

module.exports=qcmRouter;
>>>>>>> 1211fc79a06866165f963cc7f9dec9b1293b6902
