import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from '../Component/NavbarAdmin'; 

const QCMResultsComponent = () => {
    const [qcms, setQcms] = useState([]);

    useEffect(() => {
        const fetchQCMResults = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Answers/qcm-results');
                console.log('QCMs from API:', response.data); 
            } catch (error) {
                console.error('Error fetching QCM results', error);
            }
        };

        fetchQCMResults();
    }, []);
    console.log('QCMs in component:', qcms);

    return (
        <div>
            <NavbarAdmin />

            <h1>QCM Results</h1>
            {qcms.map((qcm) => (
                <div key={qcm._id}>
                    <h2>{qcm.titre}</h2>
                    <ul>
                        {qcm.etudiants.map((etudiant) => (
                            <li key={etudiant._id}>
                                {etudiant.nom} {etudiant.prenom} - Score: {etudiant.score}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default QCMResultsComponent;
