import React from 'react';
import '../../styles/landing-page-components-styles/Footer.css';
import logoIcon from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="main-footer">
      <section className="footer-container">
        <article className="footer-brand">
          <img src={logoIcon} alt="Sofia Greenpath" className="footer-logo" />
          <small className="footer-copyright">© 2024 Всички права запазени.</small>
        </article>

        <nav className="footer-navigation">
          <ul className="footer-nav-list">
            <li><a href="/organizations">Организации</a></li>
            <li><a href="/adventures">Преживявания</a></li>
            <li><a href="/about">За нас</a></li>
          </ul>

          <ul className="footer-nav-list">
            <li><a href="/clubs">Клубове</a></li>
            <li><a href="/events">Събития</a></li>
            <li><a href="/regions">Региони</a></li>
          </ul>

          <ul className="footer-nav-list">
            <li><a href="/careers">Кариери</a></li>
            <li><a href="/contacts">Контакти</a></li>
          </ul>
        </nav>

        <nav className="social-links">
          <ul>
            <li>
              <a href="https://facebook.com" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} size="2x" color='black'/>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} size="2x" color='black'/>
              </a>
            </li>
            <li>
              <a href="https://instagram.com" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} size="2x" color='black'/>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} size="2x" color='black'/>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;