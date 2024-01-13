const mongoose=require('mongoose')
const QCMModel=require('../models/QCM')
exports.getQcms=(req,res)=>{
QCMModel.find({})
.then((res)=>{
    res.json({state:"heyy"})
})
.catch((err)=>{
    res.json({state:"failed",error:err})
})



}