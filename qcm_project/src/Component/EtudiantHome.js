import React, { useEffect, useState } from "react";

import EtudiantHomeHeader from "./EtudiantHomeHeader";
import Matiere from "./Matiere";
function EtudiantHome() {
  const [sujets, setSujets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/QCM/getSujets")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSujets(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <EtudiantHomeHeader />
      <div className="myEtudiantHome">
        <div className="bienvenue">
          <div className="h1">
            <div>Quiz Votre Cerveau,</div>
            <div>Et testez vos Connaissances</div>
            <div className="sous">
              Bienvenue sur QuizEducatif, votre site incontournable pour des
              quizz amusants et interactifs qui mettent au défi vos
              connaissances sur n'importe quel sujet que vous choisissez !{" "}
            </div>
            <div className="line"></div>
          </div>
          <div>
            <img src="bienvenu.png" alt="bienvenu"></img>
          </div>
        </div>
        <div className="centerContainer">
        <div className="qs">
          <h3>QCM Quiz - Sélection</h3>
        </div>

        <div className="selectQuiz">
        
          {sujets.map((s) => {
            return <Matiere key={s._id} s={s}></Matiere>;
          })}
        </div>
      </div>
      </div>
    </>
  );
}
export default EtudiantHome;
