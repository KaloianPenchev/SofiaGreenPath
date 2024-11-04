import React from 'react';
import '../../styles/landing-page-components-styles/StartForFree.css';
import footerImg from '../../assets/landing-page-images/footer.png';

const StartForFree = () => {
  return (
    <section className="start-free">
      <article className="start-free__content">
        <header>
          <h2>ВЗЕМИ НИ НА СЛЕДВАЩОТО СИ ПЪТУВАНЕ.</h2>
          <p>Започни безплатно</p>
        </header>
        <nav>
          <a href="/register">
            <button type="button">Регистрирай се</button>
          </a>
        </nav>
      </article>
      <aside className="start-free__image">
        <figure>
          <img src={footerImg} alt="София маршрути" />
        </figure>
      </aside>
    </section>
  );
};

export default StartForFree;