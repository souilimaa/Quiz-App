import React, { useState, useEffect } from 'react';
import '../css/AddQuiz.css';
import { useLocation } from 'react-router-dom';
import NavbarAdmin from '../Component/NavbarAdmin'; // Adjust the path based on your project structure

const AddQuiz = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId');
    const initialFormData = {
        professeurId: userId,
        titre: '',
        matiereId: '',
        nouvelleMatiere: '',
        description: '',
        duree: 0,
        nombreQst: 0,
        choixMultiple: false,
        questions: []
    };

    const initialQuestionData = {
        ennonce: '',
        choix: [
            { choixEnonce: '', isCorrect: false },
            { choixEnonce: '', isCorrect: false },
            { choixEnonce: '', isCorrect: false },
            { choixEnonce: '', isCorrect: false }
        ],
        correctAnswer: -1 // No correct answer by default

    };

    const [quizAdded, setQuizAdded] = useState(false);


    const [formData, setFormData] = useState(initialFormData);
    const [matieres, setMatieres] = useState([]);
    const [showNewMatiereInput, setShowNewMatiereInput] = useState(false);

    useEffect(() => {
        const fetchMatieres = async () => {
            try {
                const response = await fetch('http://localhost:5000/matieres');
                if (!response.ok) {
                    throw new Error('Failed to fetch matieres');
                }
                const data = await response.json();
                setMatieres(data);
            } catch (error) {
                console.error('Error fetching matieres:', error.message);
            }
        };

        fetchMatieres();
    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'matiereId' && value === 'nouvelleMatiere') {
            setShowNewMatiereInput(true);
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));

            if (name === 'matiereId') {
                setShowNewMatiereInput(false);
            }
        }
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const confirmNewMatiere = async () => {
        try {
            const response = await fetch('http://localhost:5000/matieres/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom: formData.nouvelleMatiere }),
            });

            if (!response.ok) {
                throw new Error('Failed to add new matiere');
            }

            const newMatiere = await response.json();
            setMatieres((prevMatieres) => [...prevMatieres, newMatiere]);
            setFormData((prevData) => ({ ...prevData, matiereId: newMatiere._id })); // Choisir automatiquement la nouvelle matière ajoutée
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        const { professeurId, titre, matiereId, description, duree, nombreQst, choixMultiple } = formData;
        const { questions} = formData;

        try {
            const qcmResponse = await fetch('http://localhost:5000/QCM/Admin/create-qcm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ professeurId, titre, matiereId, description, duree, nombreQst, choixMultiple }),
            });

            if (!qcmResponse.ok) {
                throw new Error('Failed to create QCM');
            }

            const qcmDataResponse = await qcmResponse.json();


            for (let questionData of formData.questions) {
                const questionText = questionData.ennonce; // Extracting 'ennonce' property
                if (typeof questionText === 'string' && questionText.trim() !== '') {
                    await addQuestionToDB(questionData, qcmDataResponse._id);
                }
            }
            console.log("Setting quizAdded to true");

            setQuizAdded(true); 
            alert("Quiz added successfully!");


        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const addQuestionToDB = async (questionData, idQcm) => {
        try {
            const response = await fetch('http://localhost:5000/Question/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idQcm, ennonce: questionData.ennonce }), // Ensure questionText is a string
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Failed to add question. Server response:', errorDetails);
            }

            const result = await response.json();
            const questionId = result._id;
            for (let [index, choice] of questionData.choices.entries()) {
                const isCorrect = questionData.correctAnswer === index;
                await addChoiceToDB(choice.choixEnonce, questionId, isCorrect);
            }


            return result;
        } catch (error) {
            console.error('Error in addQuestionToDB:', error.message);
            throw error;
        }
    };

    const handleChoiceChange = (e, questionIndex, choiceIndex) => {
        const updatedChoiceText = e.target.value;

        const updatedQuestions = formData.questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                const updatedChoices = question.choices.map((choice, cIndex) => {
                    if (cIndex === choiceIndex) {
                        return { ...choice, choixEnonce: updatedChoiceText };
                    }
                    return choice;
                });
                return { ...question, choices: updatedChoices };
            }
            return question;
        });

        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };

    const handleCorrectAnswerChange = (questionIndex, choiceIndex) => {
        const updatedQuestions = formData.questions.map((question, qIndex) => {
            if (qIndex === questionIndex) {
                return { ...question, correctAnswer: choiceIndex };
            }
            return question;
        });

        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };


    const addChoiceToDB = async (choiceText, questionId, isCorrect) => {
        try {
            const response = await fetch('http://localhost:5000/choices/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idQuestion: questionId, choixEnonce: choiceText, isCorrect }),
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Failed to add choice. Server response:', errorDetails);
            }

            const result = await response.json();
            // Handle the result if needed
        } catch (error) {
            console.error('Error in addChoiceToDB:', error.message);
            throw error;
        }
    };

    const addQuestion = () => {
        if (formData.questions.length < formData.nombreQst) {
            setFormData({
                ...formData,
                questions: [...formData.questions, { ennonce: '', choices: ['', '', '', ''] }]
            });
        } else {
            alert('You have reached the maximum number of questions.');
        }
    };
    const handleQuestionChange = (e, questionIndex) => {
        const updatedText = e.target.value;

        const updatedQuestions = formData.questions.map((question, index) => {
            if (index === questionIndex) {
                return { ...question, ennonce: updatedText };
            }
            return question;
        });

        // Update the state with the new questions array
        setFormData({
            ...formData,
            questions: updatedQuestions
        });
    };
    // useEffect(() => {
    //     // Log the current state after it's updated
    //     console.log("quizAdded state:", quizAdded);
    // }, [quizAdded]); 

    return (
        <div>
        <NavbarAdmin />
        <div className="add-quiz-container">

            <h2>Add QCM</h2>

            <form onSubmit={onSubmit}>

                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="titre"
                        value={formData.titre}
                        onChange={onChange}
                        required

                    />
                </div>

                <div>
                    <label>Matiere:</label>
                    <select
                        name="matiereId"
                        value={formData.matiereId}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select a Matiere</option>
                        {matieres.map((matiere) => (
                            <option key={matiere._id} value={matiere._id}>
                                {matiere.nom}
                            </option>
                        ))}
                        <option value="nouvelleMatiere">Add a New Matiere</option>
                    </select>
                </div>

                {showNewMatiereInput && (
                    <div>
                        <label>New Matiere:</label>
                        <input
                            type="text"
                            name="nouvelleMatiere"
                            value={formData.nouvelleMatiere}
                            onChange={onChange}
                            required
                        />
                        <button type="button" onClick={confirmNewMatiere}>
                            Add
                        </button>
                    </div>

                )}
                <div>


                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={onChange}
                    />
                </div>

                <div>
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        name="duree"
                        value={formData.duree}
                        onChange={onChange}
                        min="1"
                    />
                </div>

                <div>
                    <label>Number of Questions:</label>
                    <input
                        type="number"
                        name="nombreQst"
                        value={formData.nombreQst}
                        onChange={onChange}
                        min="1"
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="choixMultiple"
                            checked={formData.choixMultiple}
                            onChange={onChange}
                        />
                        Multiple Choice
                    </label>
                </div>

                {formData.questions.map((question, index) => (
    <div key={index}>
        <label>Question {index + 1}:</label>
        <input
            type="text"
            value={question.ennonce}
            onChange={(e) => handleQuestionChange(e, index)}
            required
        />
        {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
                <input
                    type="text"
                    value={choice.choixEnonce}
                    onChange={(e) => handleChoiceChange(e, index, choiceIndex)}
                    required
                />
                {formData.choixMultiple ? (
                    // Render as checkbox for multiple choice
                    <input
                        type="checkbox"
                        checked={question.correctAnswer === choiceIndex}
                        onChange={() => handleCorrectAnswerChange(index, choiceIndex)}
                    />
                ) : (
                    // Render as radio button for single choice
                    <input
                        type="radio"
                        name={`question-${index}-correct-answer`}
                        checked={question.correctAnswer === choiceIndex}
                        onChange={() => handleCorrectAnswerChange(index, choiceIndex)}
                    />
                )}
                Correct
            </div>
        ))}
    </div>
))}

                <div>
                    <button type="button" onClick={addQuestion}>
                        Add Question
                    </button>
                </div>

                <div>
                    <button type="submit">Create QCM</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddQuiz;