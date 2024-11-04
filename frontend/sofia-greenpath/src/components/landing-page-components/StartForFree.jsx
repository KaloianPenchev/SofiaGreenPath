import React from 'react';
import '../../styles/landing-page-components-styles/StartForFree.css';
import heroImg from '../../assets/landing-page-images/hero-sec-1.png';

const StartForFree = () => {
  return (
    <section className="start-free">
      <article className="start-free__content">
        <header>
          <h2>ВЗЕМИ НИ НА СЛЕДВАЩОТО СИ ПЪТУВАНЕ.</h2>
          <p>Започни безплатно</p>
        </header>
        <nav>
          <button type="button">Регистрирай се</button>
        </nav>
      </article>
      <aside className="start-free__image">
        <figure>
          <img src={heroImg} alt="София маршрути" />
        </figure>
      </aside>
    </section>
  );
};

export default StartForFree;