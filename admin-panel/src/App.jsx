import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';  // Importiere deine Register-Komponente
import './App.css';  // Importiere die CSS-Datei (das war fehlend!)

function App() {
  return (
    <Router>
      <div className="App">
        <h1>CFI App Admin-Panel</h1>
        <Routes>
          <Route path="/" element={<p>Willkommen! Gehe zur <a href="/register">Registrierung</a>.</p>} />
          <Route path="/register" element={<Register />} />
          {/* Füge später mehr Routes hinzu, z.B. /login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;