const express=require('express');
const qcmRouter=express.Router();
const qcmController=require('../Controllers/qcmController')
qcmRouter.route('/createQcm')
.get();

qcmRouter.route('/getQcms')
.get(qcmController.getQcms)


qcmRouter.route('/:id/:nom')
.get(qcmController.getQcmsByMatiereId)
module.exports=qcmRouter;
qcmRouter.route('/:id')
.get(qcmController.getQcmsById)
module.exports=qcmRouter;