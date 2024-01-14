import React from "react";
import EtudiantHome from "../css/EtudiantHome.css";
function EtudiantHomeHeader() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="QuizLogo" src="./quizLogo.png" alt="Quiz Logo"></img>
        </div>
        <h2 className="title"> QuizEducatif</h2>
        <div className="h">
         
          <div className="categorie">
            <select id="category">
              <option value="">Categories</option>
              <option value="java">Java</option>
            </select>
          </div>
          <div>
            <form>
              <input placeholder="Entrer un Sujet ou un Catégorie" className="sujetInput" type="text"></input>
              <input type="submit" className="submitInput" value="Rechercher"></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EtudiantHomeHeader;
