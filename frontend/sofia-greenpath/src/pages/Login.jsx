import '../../src/styles/main-pages/Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Входът не бе успешен');
      }
    } catch (error) {
      console.error('Входът не бе успешен:', error);
      setErrorMessage('Възникна грешка при вход. Моля, опитайте отново по-късно.');
    }
  };

  return (
    <main className="login-container">
      <section className="login-section">
        <h1>ВХОД</h1>
        <p className="register-prompt">
          Нямаш акаунт?{' '}
          <a href="/register">Регистрация</a>
        </p>
        <p className="separator-form">ИЛИ</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="username">Потребителско име</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Парола</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">ВЛЕЗ СЕГА</button>
          </fieldset>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </section>
    </main>
  );
};

export default Login;
