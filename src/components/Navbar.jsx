import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoEcom from '../assets/Elementos graficos/LOGO ECOM.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`global-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-link" onClick={closeMenu}>
          <img src={logoEcom} alt="ECOM Logo" className="navbar-logo" />
        </Link>

        <button 
          className={`hamburger-btn ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/tickets" 
            className={`nav-link ${location.pathname === '/tickets' ? 'active-link' : ''}`}
            onClick={closeMenu}
          >
            Entradas
          </Link>
          <Link 
            to="/stands" 
            className={`nav-link ${location.pathname === '/stands' ? 'active-link' : ''}`}
            onClick={closeMenu}
          >
            Stands
          </Link>
          {/* 
          <Link 
            to="/patrocinios" 
            className={`nav-link ${location.pathname === '/patrocinios' ? 'active-link' : ''}`}
            onClick={closeMenu}
          >
            Patrocinios
          </Link> 
          */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
