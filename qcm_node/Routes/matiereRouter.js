const express=require('express')
const matiereRouter=express.Router();
const matiereController=require('../Controllers/matiereController')

matiereRouter.route('/getSujets')
.get(matiereController.getMatieres)



module.exports=matiereRouter;