import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Registrierung erfolgreich! Token: ' + response.data.token);
      // Hier: Speichere Token in localStorage oder Context, navigiere zu Login/Dashboard
    } catch (error) {
      setMessage('Fehler: ' + (error.response?.data?.message || 'Unbekannter Fehler'));
    }
  };

  return (
    <div className="register-page">
      <h1>User Registrierung</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrieren</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;