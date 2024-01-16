import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

import ('../css/EtudiantRegistration.css');

const EtudiantRegistration = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { nom, prenom, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError(''); 

        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nom, prenom, email, password })
            };

            const response = await fetch('http://localhost:5000/etudiant/register', config);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const responseData = await response.json();
            console.log(responseData);
                      alert('Etudiant registered successfully!');
        } catch (error) {
            console.error(error.message);
            setError(error.message); 
        }
    };

    return (
        
        <div className="etudiant-registration">
        <h2>Register </h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={e => onSubmit(e)}>
                <div>
                    <input
                        type="text"
                        placeholder="Nom"
                        name="nom"
                        value={nom}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Prenom"
                        name="prenom"
                        value={prenom}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Register" />
            </form>
            <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
        </div>
    );
};

export default EtudiantRegistration;
