import React, { useState } from 'react';
import ContactUs from './ContactUs';
import '../../styles/landing-page-components-styles/NavBar.css';
import logoIcon from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [isContactFormOpen, setContactFormOpen] = useState(false);

  const handleOpenContactForm = () => setContactFormOpen(true);
  const handleCloseContactForm = () => setContactFormOpen(false);

  return (
    <>
      <header className="navbar">
        <nav>
          <a href="/" className="logo">
            <img src={logoIcon} alt="Sofia GreenPath" />
          </a>
          <ul className="nav-links">
            <li><a href="/login">Вход</a></li>
            <li className="lang">
              <FontAwesomeIcon icon={faGlobe} />
              <a href="/#" style={{ marginLeft: '0.5rem' }}>BG</a>
            </li>
            <li className="contacts">
              <button onClick={handleOpenContactForm} className="contacts-a">Контакти</button>
            </li>
            <li><a href="/register" className="cta-button">Започни сега →</a></li>
          </ul>
        </nav>
      </header>
      <ContactUs isOpen={isContactFormOpen} onClose={handleCloseContactForm} />
    </>
  );
};

export default NavBar;
