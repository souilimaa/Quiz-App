const express=require('express');
const choixRouter=express.Router();
const choixController=require('../Controllers/choixController')


choixRouter.route('/:questionId')
.get(choixController.getChoixByQuestionId)



module.exports=choixRouter; 