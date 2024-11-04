// SignUp.jsx
import '../../src/styles/main-pages/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful');
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <main className="signup-container">
      <section className="signup-section">
        <h1>Създай акаунт</h1>
        <p className="login-prompt">
          Вече имаш регистрация?{' '}
          <a href="/login">Вход</a>
        </p>
        <p className="separator-form">ИЛИ</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">Имейл</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="username">Потребителско име</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Парола</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">СЪЗДАЙ НОВ АКАУНТ</button>
          </fieldset>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
};

export default SignUp;
