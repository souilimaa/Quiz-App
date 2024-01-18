import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch('http://localhost:5000/login', config);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Login failed');
      }
      const responseData = await response.json();
      console.log("Response Data: ", responseData); // Log to check the response
      setUserId(responseData.userId);
      
      localStorage.setItem('userData', JSON.stringify(responseData));
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        const redirectUrl = userData.userType === 'Professeur' ? '/admin-dashboard' : '/userHome';
        window.location.href = `${redirectUrl}?userId=${userData.userId}`;
      }
    }
  }, [userId]);
  

  return (
    <div className="login-container">
    <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
