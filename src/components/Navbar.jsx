import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="navbar-logo">
          Bio-<span className="text-gradient">Renewal</span>
        </a>
        <ul className="navbar-menu">
          <li><a href="#about">品牌簡介</a></li>
          <li><a href="#products">產品系列</a></li>
          <li><a href="#contact">聯絡我們</a></li>
        </ul>
        <button className="btn btn-primary nav-btn">
          預約諮詢
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
