const express=require('express')
const etudiantAnswerRouter=express.Router();
const etudiantAnswerController=require('../Controllers/etudiantAnswerController')

etudiantAnswerRouter.route('/')
.post(etudiantAnswerController.insertEtudiantAnswer)

module.exports=etudiantAnswerRouter;