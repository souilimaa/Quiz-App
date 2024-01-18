const express=require('express');
const QuestionRouter=express.Router();
const questionController=require('../Controllers/questionController')

QuestionRouter.route('/:qcmId').get(questionController.getQuestionsByQcmId)
QuestionRouter.route('/add').post(questionController.addQuestion)



module.exports=QuestionRouter;