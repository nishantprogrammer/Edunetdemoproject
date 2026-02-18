import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
        <footer style={{ textAlign: 'center', padding: '2rem', color: '#666', marginTop: 'auto' }}>
          <p>© 2026 EcoDrive | EV Pollution Savings Calculator</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
