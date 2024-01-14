const mongoose=require('mongoose')
const QCMModel=require('../models/QCM')
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