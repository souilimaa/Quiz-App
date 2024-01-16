const express = require('express');
const qcmRouter = express.Router();
const qcmController = require('../Controllers/qcmController');

qcmRouter.route('/Admin/create-qcm').post(qcmController.createQCM);
qcmRouter.route('/getQcms').get(qcmController.getQcms);
qcmRouter.route('/getQcmByMatiere/:matiereId').get(qcmController.getQuizzesByMatiere);
qcmRouter.route('/getQcmById/:qcmId').get(qcmController.getQcmById);
qcmRouter.route('/:qcmId').delete(qcmController.deleteQCM);


qcmRouter.route('/:id/:nom').get(qcmController.getQcmsByMatiereId)
qcmRouter.route('/:id').get(qcmController.getQcmsById)
module.exports=qcmRouter;

module.exports = qcmRouter;
