import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/ListQuize.css';
import NavbarAdmin from '../Component/NavbarAdmin'; // Adjust the path based on your project structure

const ListQuize = () => {
  
  const [matieres, setMatieres] = useState([]);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [qcmTitles, setQcmTitles] = useState([]);

  // Fetch Matieres
  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const response = await fetch('http://localhost:5000/matieres/');
        if (!response.ok) {
          throw new Error(`Failed to fetch matieres: HTTP status ${response.status}`);
        }
        const data = await response.json();
        setMatieres(data);
      } catch (error) {
        console.error('Error fetching matieres:', error.message);
      }
    };

    fetchMatieres();
  }, []);

  // Fetch QCM titles for the selected Matiere
  useEffect(() => {
    const fetchQcmTitles = async () => {
      if (selectedMatiere) {
        try {
          const response = await fetch(`http://localhost:5000/QCM/getQcmByMatiere/${selectedMatiere._id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch QCM titles: HTTP status ${response.status}`);
          }
          const data = await response.json();
          setQcmTitles(data);
        } catch (error) {
          console.error('Error fetching QCM titles:', error);
        }
      }
    };

    fetchQcmTitles();
  }, [selectedMatiere]);

  const handleMatiereChange = (event) => {
    const matiereId = event.target.value;
    const matiere = matieres.find(m => m._id === matiereId);
    setSelectedMatiere(matiere);
  };

  return (
    <div>
            <NavbarAdmin />
      <h1>QCM List</h1>
      {/* Matiere Dropdown */}
      <label htmlFor="matiereSelect">Select Matiere: </label>
      <select id="matiereSelect" onChange={handleMatiereChange}>
        <option value="">Select Matiere</option>
        {matieres.map(matiere => (
          <option key={matiere._id} value={matiere._id}>{matiere.nom}</option>
        ))}
      </select>

      {/* QCM Titles */}
      {qcmTitles.length > 0 && (
        <div>
          <h2>QCM Titles for {selectedMatiere ? selectedMatiere.nom : 'selected Matiere'}</h2>
          <ul>
            {qcmTitles.map(qcm => (
              <li key={qcm._id}>
                <Link to={`/qcmdetails/${qcm._id}`}>{qcm.titre}</Link>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ListQuize;
