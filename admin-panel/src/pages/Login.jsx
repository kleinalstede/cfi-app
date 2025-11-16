
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Füge das hinzu, falls du React Router nutzt (für Redirect)

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Für Redirect nach erfolgreichem Login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset Message vor jedem Versuch
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Speichere Token
      setMessage('Login erfolgreich! Token gespeichert. Weiterleitung...');
      // Redirect nach 1 Sekunde (z.B. zu Dashboard – passe den Pfad an)
      setTimeout(() => {
        navigate('/dashboard'); // Oder wohin du willst, z.B. '/admin'
      }, 1000);
    } catch (error) {
      setMessage('Fehler beim Login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-page"> {/* Nutzt gleiche Styles wie Register für Konsistenz */}
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Passwort" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Einloggen</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
