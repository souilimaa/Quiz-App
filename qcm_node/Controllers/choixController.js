
const mongoose=require('mongoose')
const ChoixModel=require('../models/Choix')



exports.getChoixByQuestionId=(req,res)=>{

   ChoixModel.find({
    idQuestion:req.params.questionId})
    .then((choixes) => {
        res.json({ state: "success",choixes: choixes});
    })
    .catch((err) => {
        res.json({ state: "failed", error: err, choixes: [] });
    });



}