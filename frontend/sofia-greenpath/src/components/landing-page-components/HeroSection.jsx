import React from 'react';
import '../../styles/landing-page-components-styles/HeroSection.css';
import heroImg from '../../assets/landing-page-images/hero-sec-1.png';

const HeroSection = () => {
  return (
    <main className="hero">
      <section className="hero-content">
        <article className="hero-text">
          <h1>Намери чисти маршрути в София</h1>
          <p>
            Изпитай радостта от колоезденето в София, докато се наслаждаваш на
            чист въздух и оценени от общността маршрути.
          </p>
          <a href="/register" className="start-button">Започни сега →</a>
          <h2>Избери нови маршрути за колоездене</h2>
        </article>
        <figure className="hero-image">
          <img src={heroImg} alt="София маршрути" />
        </figure>
      </section>
    </main>
  );
};

export default HeroSection;