const express=require('express');
const QuestionRouter=express.Router();
const questionController=require('../Controllers/questionController')

    QuestionRouter.route('/:qcmId')
.get(questionController.getQuestionsByQCMId)



module.exports=QuestionRouter;