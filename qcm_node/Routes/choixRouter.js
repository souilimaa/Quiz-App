const express=require('express');
const choixRouter=express.Router();
const choixController=require('../Controllers/choixController')


choixRouter.route('/:questionId').get(choixController.getChoixByQuestionId)
choixRouter.route('/add').post(choixController.addChoice);

choixRouter.route('/choices/:questionId').get(choixController.getChoicesForQuestion);


module.exports=choixRouter; 




