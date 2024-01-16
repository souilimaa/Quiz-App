const mongoose = require('mongoose');
const QuestionModel=require('../models/Question')




exports.getQuestionsByQCMId=(req,res)=>{
    QuestionModel.find({idQcm:req.params.qcmId})
    .then(qst=>{
 
     res.json({state:"success",questions:qst})
 
    })
    .catch(err=>{
     res.json({ state: "failed", error: err, questions: [] });
 
    })
}