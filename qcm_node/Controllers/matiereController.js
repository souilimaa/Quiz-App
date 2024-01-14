const matiereModel=require('../models/Matiere');

exports.getMatieres=(req,res)=>{
    matiereModel.find({})
    .then(matieres=>{
        res.json({state:"success",data:matieres})
    })
    .catch(err=>{
        res.json({state:"failed",data:[]})
    })
}