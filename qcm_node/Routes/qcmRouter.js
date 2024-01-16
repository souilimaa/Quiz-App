const express = require('express');
const qcmRouter = express.Router();
const qcmController = require('../Controllers/qcmController');

qcmRouter.route('/Admin/create-qcm').post(qcmController.createQCM);
qcmRouter.route('/getQcms').get(qcmController.getQcms);
qcmRouter.route('/getQcmByMatiere/:matiereId').get(qcmController.getQuizzesByMatiere);
qcmRouter.route('/getQcmById/:qcmId').get(qcmController.getQcmById);
qcmRouter.route('/:qcmId').delete(qcmController.deleteQCM);


<<<<<<< HEAD
qcmRouter.route('/:id/:nom')
.get(qcmController.getQcmsByMatiereId)
module.exports=qcmRouter;
qcmRouter.route('/:id')
.get(qcmController.getQcmsById)
module.exports=qcmRouter;
=======
module.exports = qcmRouter;
>>>>>>> df663c6d4e5e17cf61b09a439b5b5e58a59f43e7
