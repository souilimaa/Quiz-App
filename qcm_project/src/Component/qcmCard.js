import React from 'react'
import { useNavigate } from 'react-router-dom';


function QcmCard(props){
    const navigate = useNavigate();


    const handleLancerQcm=(id)=>{
        console.log("button clicked"+id)
        navigate(`/QCM/QUIZ/${id}`);
        
        
        
         }
return(
    <div class="qcmCard">
        <div className='st'>
            Sujet: <strong>{props.qcm.titre}</strong>
        </div>
    <div>Nombre de questions: <strong>{props.qcm.nombreQst}</strong></div>
    <div>Durée: <strong>{props.qcm.duree} minutes</strong></div>

    <button onClick={() => handleLancerQcm(props.qcm._id)}>Lancer le QCM</button>
    </div>
)


} 

export default QcmCard;