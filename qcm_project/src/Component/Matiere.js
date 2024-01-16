import React from 'react'
import {Link } from "react-router-dom";
function Matiere(props){
    return(
        <>
        <div className="Matierecard">
        <Link to={"/QCMs/"+props.s._id+"/"+props.s.nom}><strong>{props.s.nom}</strong></Link>
        </div>
        </>
    )
}
export default Matiere;