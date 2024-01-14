const express=require('express');
const qcmRouter=express.Router();
const qcmController=require('../Controllers/qcmController')
qcmRouter.route('/Admin/create-qcm').post(qcmController.createQCM);
// qcmRouter.route('/createQcm').get();
qcmRouter.route('/getQcms').get(qcmController.getQcms)

module.exports=qcmRouter;
