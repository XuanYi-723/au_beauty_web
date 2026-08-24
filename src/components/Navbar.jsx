import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { inquiryList } = useStore();

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
        <Link to="/" className="navbar-logo">
          於美 <span className="text-gradient">au_beauty</span>
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              品牌簡介
            </Link>
          </li>
          <li>
            <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>
              產品系列
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              聯絡我們
            </Link>
          </li>
        </ul>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/inquiry" className="inquiry-cart-icon" style={{ position: 'relative', fontSize: '1.5rem', textDecoration: 'none' }}>
            🛒
            {inquiryList.length > 0 && (
              <span className="cart-badge" style={{ position: 'absolute', top: '-8px', right: '-10px', background: 'var(--color-accent)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>
                {inquiryList.length}
              </span>
            )}
          </Link>
          <Link to="/inquiry" className="btn btn-primary nav-btn">
            預約諮詢
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
