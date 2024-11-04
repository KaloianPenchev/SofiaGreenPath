import React from 'react';
import '../../styles/landing-page-components-styles/ContactUs.css';

const ContactUs = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      workEmail: '',
      firstName: '',
      lastName: '',
      phone: '',
      company: '',
      employees: ''
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log(formData);
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    if (!isOpen) return null;
  
    return (
      <article className="modal-overlay">
        <section className="modal-content">
          <header className="modal-header">
            <h2>Свържете се с отдел Продажби</h2>
            <button 
              type="button" 
              onClick={onClose}
              className="close-button"
              aria-label="Затвори формата"
            >
              ×
            </button>
          </header>
  
          <form onSubmit={handleSubmit} className="contact-form">
            <fieldset>
              <legend className="visually-hidden">Контактна информация</legend>
              
              <label htmlFor="workEmail">
                Служебен имейл <em aria-label="задължително">*</em>
              </label>
              <input
                type="email"
                id="workEmail"
                name="workEmail"
                required
                value={formData.workEmail}
                onChange={handleChange}
              />
  
              <label htmlFor="firstName">
                Име <em aria-label="задължително">*</em>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
  
              <label htmlFor="lastName">
                Фамилия <em aria-label="задължително">*</em>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
  
              <label htmlFor="phone">
                Телефон <em aria-label="задължително">*</em>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
  
              <label htmlFor="company">
                Компания <em aria-label="задължително">*</em>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
              />
  
              <label htmlFor="employees">
                Брой служители <em aria-label="задължително">*</em>
              </label>
              <select
                id="employees"
                name="employees"
                required
                value={formData.employees}
                onChange={handleChange}
              >
                <option value="">Изберете...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501+">501+</option>
              </select>
  
              <button type="submit" className="submit-button">
                Изпрати
              </button>
            </fieldset>
          </form>
        </section>
      </article>
    
  );
};

export default ContactUs;