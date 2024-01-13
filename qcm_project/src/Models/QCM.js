const mongoose=require('mongoose')
const QCMSchema=new mongoose.Schema({
    professeurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur', required: true },
    titre:{type:String,required:true},
    matiereId: { type: mongoose.Schema.Types.ObjectId, ref: 'Matiere', required: true },
    description:{type:String,required:true},
    duree:{type:Number,required:true},
    nombreQst:{type:Number,required:true},
    choixMultiple:{type:Boolean,required:true},
    createdAt:{type:Date,default:Date.now}
})
const QCMModel=mongoose.Model('QCM',QCMSchema)
module.exports=QCMModel;