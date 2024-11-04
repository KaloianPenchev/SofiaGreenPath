import React from 'react';
import '../../styles/landing-page-components-styles/NavBar.css';
import logoIcon from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <header className="navbar">
      <nav>
        <a href="/" className="logo">
          <img src={logoIcon} alt="Sofia GreenPath"/>
        </a>
        <ul className="nav-links">
          <li><a href="/login">Вход</a></li>
          <li className="lang">
            <FontAwesomeIcon icon={faGlobe} />
            <a href="/language" style={{marginLeft: '0.5rem'}}>
              BG
            </a>
          </li>
          <li><a href="/contacts" className="contacts">Контакти</a></li>
          <li><a href="/register" className="cta-button">Започни сега →</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;