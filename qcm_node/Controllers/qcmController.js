const mongoose=require('mongoose')
const QCMModel=require('../models/QCM')
const MatiereModel=require('../models/Matiere')
exports.getQcms=(req,res)=>{
QCMModel.find({})
.then((qcms)=>{
    res.json({state:"success",data:qcms});
})
.catch((err)=>{
    console.log(err)
    res.json({state:"failed",error:err,qcms:[]})
})
}






exports.getQcmsByMatiereId = (req,res) => {
        QCMModel.find({ matiereId:req.params.id})
            .then((qcms) => {
                res.json({ state: "success", data: qcms});
            })
            .catch((err) => {
                res.json({ state: "failed", error: err, qcms: [] });
            });
   
}

exports.getQcmsById=(req,res)=>{
    QCMModel.find({_id:req.params.id})
    .then((qcm)=>{
        res.json({state:"success",qcm:qcm})
    })
    .catch(err=>{
        res.json({state:"failed",qcm:""})
    })
}