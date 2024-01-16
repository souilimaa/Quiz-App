import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/QcmDetails.css'
import NavbarAdmin from '../Component/NavbarAdmin'; // Adjust the path based on your project structure

const QcmDetails = () => {
  const { qcmId } = useParams();
  const [qcmDetails, setQcmDetails] = useState(null);
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    const fetchQcmDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/QCM/getQcmById/${qcmId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch QCM details: HTTP status ${response.status}`);
        }
        const data = await response.json();
        setQcmDetails(data);
      } catch (error) {
        console.error('Error fetching QCM details:', error);
      }
    };

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/Question/getQuestionsByQcmId/${qcmId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch questions: HTTP status ${response.status}`);
        }
        const questionsData = await response.json();
        return questionsData;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    const fetchChoicesForQuestion = async (questionId) => {
      try {
        const response = await fetch(`http://localhost:5000/choices/choices/${questionId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch choices: HTTP status ${response.status}`);
        }
        const choices = await response.json();
        return choices;
      } catch (error) {
        console.error('Error fetching choices:', error);
        return [];
      }
    };

    const fetchData = async () => {
      await fetchQcmDetails();
      const questionsData = await fetchQuestions();

      if (questionsData) {
        const questionsWithChoices = await Promise.all(
          questionsData.map(async (question) => {
            const choices = await fetchChoicesForQuestion(question._id);
            return { ...question, choices };
          })
        );

        setQuestions(questionsWithChoices);
      }
    };

    fetchData();
  }, [qcmId]);


  const deleteQuiz = async () => {
    try {
      const response = await fetch(`http://localhost:5000/QCM/${qcmId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Failed to delete QCM: HTTP status ${response.status}`);
      }
      console.log('Quiz deleted successfully');
      // Optionally, redirect or update the state to reflect the deletion
      setQcmDetails(null);
      setQuestions([]); 
    } catch (error) {
      console.error('Error deleting the quiz:', error);
    }
  };

  const updateQuiz = () => {
    // Redirect to the update page 
    console.log('Navigate to update quiz page');
  };

  return (
    <div>
            <NavbarAdmin />

      <h1>QCM Details</h1>
      {qcmDetails ? (
        <div>
          <h2>{qcmDetails.titre}</h2>
          <p>{qcmDetails.description}</p>
          <p> Duree du QCM est {qcmDetails.duree} minutes</p>
          <div className="clearfix">
            <button className="update-button" onClick={updateQuiz}>
              Update Quiz
            </button>
            <button className="delete-button" onClick={deleteQuiz}>
              Delete Quiz
            </button>
            {/* ... other content ... */}
          </div>

          <h3>Questions</h3>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <p>{question.ennonce}</p>
                <ul>
                  {question.choices.map((choice, choiceIndex) => (
                    <li key={choiceIndex}>{choice.choixEnonce}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading QCM details...</p>
      )}
    </div>
  );
};
export default QcmDetails;
