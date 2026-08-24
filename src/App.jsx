import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
import Compare from './pages/Compare';
import Inquiry from './pages/Inquiry';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/inquiry" element={<Inquiry />} />
          </Routes>
        </main>

        <Footer />
        <CompareBar />
      </div>
    </Router>
  );
}

export default App;
