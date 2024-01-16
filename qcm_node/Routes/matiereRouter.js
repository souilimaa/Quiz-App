const express=require('express')
const matiereRouter=express.Router();
const matiereController=require('../Controllers/matiereController')

matiereRouter.route('/getSujets').get(matiereController.getMatieres)
matiereRouter.route('/create').post(matiereController.createMatiere)
matiereRouter.route('/').get(matiereController.getAllMatieres)

module.exports=matiereRouter;