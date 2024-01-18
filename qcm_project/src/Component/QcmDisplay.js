import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allqcms from '../css/allqcms.css';

function QcmDisplay() {
  const { qcmId } = useParams();
  const [qcm, setQcm] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(null);
  const [validerClicked, setValiderClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/QCM/" + qcmId)
      .then((response) => response.json())
      .then((data) => {
        setQcm(data.qcm[0]);
        setTimer(data.qcm[0].duree * 60); // Convert minutes to seconds
      }); 

    fetch("http://localhost:5000/Quiz/questions/" + qcmId)
    
      .then((response) => response.json())
      .then((data) => setQuestions(data));
      console.log("Questions:", questions); // Debugging line

  }, []);

  useEffect(() => {
    const currentQuestionId = questions[currentQuestionIndex]?._id;
  
    if (currentQuestionId) {
      fetch("http://localhost:5000/quiz/choices/" + currentQuestionId)
        .then((response) => response.json())
        .then((data) => setChoices(data.choixes))
        .catch((error) => console.error("Error fetching choices:", error));
    }
  }, [currentQuestionIndex, questions]);
  
  const handleEnvoyerQuizClick = () => {
    setQuizFinished(true);
    setMessage("");

    const etudiantId = "65a2643f98dec64e6941b8ff";
    const postData = {
      score: score,
      etudiantId: etudiantId,
      qcmId: qcm._id,
    };
  
    fetch("http://localhost:5000/Answer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error("Error sending data to server:", error);
    });  
  };

  useEffect(() => {
    if (timer > 0 && !quizFinished) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0 && !quizFinished) {
      setQuizFinished(true);
      setMessage("Time Ended!");

      handleEnvoyerQuizClick();
    }
  }, [timer, quizFinished]);

  const handleValiderClick = () => {
    if (selectedChoice === null) {
      alert("Please choose an answer before clicking Valider.");
      return;
    }

    const isCorrect = choices[selectedChoice]?.isCorrect;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setMessage("Correct! +1");
    } else {
      setMessage("Incorrect! +0");
    }

    setShowMessage(true);
    setValiderClicked(true);
  };

  const handleSuivantClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedChoice(null);
      setShowMessage(false);
      setValiderClicked(false);
    } else {
      setQuizFinished(true);
      setMessage("");
    }
  };

  return (
    <div className="myQst">
      {qcm && (
        <div>
          <h1>{qcm.titre}</h1>
          
          <div>
            Duration: <strong>{Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")}</strong>
          </div>
        </div>
      )}

      {quizFinished ? (
        <div>
          <h2>QCM Finished</h2>
          <p style={{color:"red"}}>Your Score: {score}/{questions.length}</p>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
          <p>{questions[currentQuestionIndex]?.ennonce}</p>

          {choices.map((choice, index) => (
            <div className="inpt" key={index}>
              <input 
                type="radio"
                name="choices"
                onChange={() => setSelectedChoice(index)}
                checked={selectedChoice === index}
                disabled={validerClicked}
              />
              {choice.choixEnonce}
            </div>
          ))}

          {showMessage && <p>{message}</p>}

          {validerClicked ? (
            <div>
              {currentQuestionIndex === questions.length - 1 ? (
                <button className="btn"onClick={handleEnvoyerQuizClick}>Envoyer Quiz</button>
                ) : (
                  <button className="btn" onClick={handleSuivantClick}>Suivant</button>
                )}
              </div>
            ) : (
              <div>
                <button className="btn" onClick={handleValiderClick}>Valider</button>
              </div>
            )}
  
          </div>
        )}
      </div>
    );
  }
  
  export default QcmDisplay;