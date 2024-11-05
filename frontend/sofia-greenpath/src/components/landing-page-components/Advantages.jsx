import React from "react";
import '../../styles/landing-page-components-styles/Advantages.css';
import airImg from '../../assets/landing-page-images/air.png';
import bicycleImg from '../../assets/landing-page-images/bicycle.png';
import gradeImg from '../../assets/landing-page-images/grade.png';
import arrow1 from '../../assets/landing-page-images/arr1.png';
import arrow2 from '../../assets/landing-page-images/arr2.png';

const Advantages = () => {
  return (
    <article className="advantages">
        <h2>Защо платформата е подходяща за теб?</h2>
        <ul className="feature-list">
            <li className="feature-item">
            <figure className="feature-image">
                <img src={airImg}/>
            </figure>
            <article className="feature-content">
                <strong className="feature-number" aria-label="Feature 1">1</strong>
                <h3>Реални данни за качеството на въздуха</h3>
                <p>Виж информация в реално време за качеството на въздуха и лесно избягвай замърсените райони.</p>
            </article>
            </li>
            <img className="arrow-icon" src={arrow1}/>
            <li className="feature-item feature-item-reversed">
                <figure className="feature-image" style={{paddingRight: '30rem'}}>
                    <img src={bicycleImg}/>
                </figure>
                <article className="feature-content">
                    <strong className="feature-number" aria-label="Feature 2">2</strong>
                    <h3>Персонализирани вело-маршрути</h3>
                    <p>Открий маршрути, които отговарят на твоите предпочитания и възможности.</p>
                </article>
            </li>
            <img className="arrow-icon" src={arrow2}/>
            <li className="feature-item">
            <figure className="feature-image">
                <img src={gradeImg}/>
            </figure>
            <article className="feature-content">
                <strong className="feature-number" aria-label="Feature 3">3</strong>
                <h3>Маршрути, оценени от общността</h3>
                <p>Използвай препоръки от други велосипедисти и опознай най-добрите маршрути в София.</p>
            </article>
            </li>
        </ul>      
    </article>
  );
};

export default Advantages;