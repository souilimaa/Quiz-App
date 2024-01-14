const express = require('express');
const qcmRouter = express.Router();
const qcmController = require('../Controllers/qcmController');

qcmRouter.route('/Admin/create-qcm').post(qcmController.createQCM);
qcmRouter.route('/getQcms').get(qcmController.getQcms);
qcmRouter.route('/getQcmByMatiere/:matiereId').get(qcmController.getQuizzesByMatiere);
qcmRouter.route('/getQcmById/:qcmId').get(qcmController.getQcmById);

module.exports = qcmRouter;
