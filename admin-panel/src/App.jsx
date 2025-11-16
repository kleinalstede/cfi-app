import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';  // Neu: Importiere Login
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>CFI App Admin-Panel</h1>
        <Routes>
          <Route path="/" element={
            <p>Willkommen! Gehe zur <a href="/register">Registrierung</a> oder zum <a href="/login">Login</a>.</p>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  {/* Neu: Route für Login */}
          {/* Füge später mehr Routes hinzu, z.B. /dashboard */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;