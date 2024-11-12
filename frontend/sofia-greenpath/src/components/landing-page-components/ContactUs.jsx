import React, { useState, useEffect } from 'react';
import '../../styles/landing-page-components-styles/ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faBuilding 
} from '@fortawesome/free-solid-svg-icons';

const ContactUs = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form data
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const company = e.target.company.value;
    const feedback = e.target.feedback.value;

    // Validation checks
    if (!name || !email || !phone || !company || !feedback || rating === 0) {
      alert('Моля, попълнете всички полета и дайте оценка.');
      return;
    }

    const feedbackData = {
      name,
      email,
      phone,
      company,
      rating,
      feedback,
    };

    try {
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackData),
      });
      
      if (response.ok) {
        alert('Обратната връзка беше изпратена успешно');
        setRating(0);
        handleClose();
      } else {
        alert('Неуспешно изпращане на обратната връзка');
      }
    } catch (error) {
      console.error('Грешка:', error);
      alert('Възникна грешка');
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 50);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <aside className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={handleOverlayClick}>
      <section className="modal-content">
        <button onClick={handleClose} className="cls-button">×</button>
        <form className="contact-form" onSubmit={handleSubmit}>
          <fieldset className="form-row">
            <section className="input-group">
              <label htmlFor="name">Име</label>
              <article className="input-wrapper">
                <FontAwesomeIcon  className="input-icon" icon={faUser} />
                <input type="text" id="name" name="name" className="inp-wrp" required />
               </article>
            </section>

            <section className="input-group">
              <label htmlFor="email">Имейл</label>
              <article className="input-wrapper">
                <FontAwesomeIcon  className="input-icon" icon={faEnvelope} />
                <input type="email" id="email" name="email" className="inp-wrp" required />
                
              </article>
            </section>
          </fieldset>
          
          <fieldset className="form-row">
            <section className="input-group">
              <label htmlFor="phone">Номер</label>
              <article className="input-wrapper">
                <FontAwesomeIcon  className="input-icon" icon={faPhone} />
                <input type="tel" id="phone" name="phone" className="inp-wrp" required />
               </article>
            </section>

            <section className="input-group">
              <label htmlFor="company">Компания</label>
              <article className="input-wrapper">
                <FontAwesomeIcon  className="input-icon" icon={faBuilding} />
                 <input type="text" id="company" name="company" className="inp-wrp" required />
               </article>
            </section>
          </fieldset>

          <section className="rating-group">
            <label>Оценка</label>
            <article className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={star <= rating ? 'star active' : 'star'}
                >
                  ★
                </button>
              ))}
            </article>
          </section>

          <section className="input-group">
            <label htmlFor="feedback">Обратна връзка</label>
            <textarea id="feedback" name="feedback" rows="4" required></textarea>
          </section>

          <button type="submit" className="submit-button">
            Изпрати
          </button>
        </form>
      </section>
    </aside>
  );
};

export default ContactUs;
