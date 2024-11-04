import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/home-page-components-styles/sidebar-maplayers-styles/SideBar.css';
import logoIcon from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlassLocation, 
  faGear, 
  faBookmark,
  faCircleQuestion,
  faAngleDown,
  faAngleUp,
  faStar as solidStar,
  faStar as regularStar 
} from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ isOpen, onClose, recentSearches, fetchRecentSearches }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [errorMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchFavorites = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user/favoriteSearches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorite searches:", error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const toggleFavorite = async (search) => {
    try {
      await axios.post(
        'http://localhost:5000/user/favoriteSearches',
        { search },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFavorites(); 
      fetchRecentSearches(); 
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : ''}`}>
      <header className="sidebar-header">
        <figure className="logo-container">
          <img src={logoIcon} alt="Logo" className="logo" />
          <button type="button" className="close-button" onClick={onClose}>×</button>
        </figure>
      </header>
      
      <nav className="sidebar-navigation">
        <ul className="navigation-list">
          <li>
            <button type="button" className="nav-item" onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
            <h1>Скорошни търсения</h1>
            </button>
            <button className="expand-loc-btn" onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
              <FontAwesomeIcon icon={isSearchExpanded ? faAngleUp : faAngleDown} />
            </button>
            {isSearchExpanded && (
              <ul className="recent-searches-list">
                {recentSearches.map((search, index) => (
                  <li key={index} className="recent-search-item">
                    {search}
                    <button 
                      className="favorite-button"
                      onClick={() => toggleFavorite(search)}
                    >
                      <FontAwesomeIcon style={{color: '#d1d1d1'}} icon={favorites.includes(search) ? solidStar : regularStar} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <button type="button" className="nav-item" onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}>
              <FontAwesomeIcon icon={faBookmark} />
              <h1>Любими маршрути</h1>
            </button>
            <button className="expand-loc-btn" onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}>
              <FontAwesomeIcon icon={isFavoritesExpanded ? faAngleUp : faAngleDown} />
            </button>
            {isFavoritesExpanded && (
              <ul className="favorites-list">
                {favorites.map((search, index) => (
                  <li key={index} className="favorite-search-item">
                    {search}
                    <button 
                      className="favorite-button"
                      onClick={() => toggleFavorite(search)}
                    >
                      <FontAwesomeIcon style={{color: '#ffd036'}} icon={solidStar} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <footer className="sidebar-footer">
        <ul className="footer-list">
          <li>
            <button type="button" className="footer-item" style={{ marginBottom: '-1rem' }}>
              <FontAwesomeIcon icon={faCircleQuestion} />
              <h1>Помощ</h1>
            </button>
          </li>
          <li>
            <button type="button" className="footer-item">
              <FontAwesomeIcon icon={faGear} />
              <h1>Настройки</h1>
            </button>
          </li>
          <li>
            <button type="button" className="footer-item user-profile">
              <h1>Иван Иванов</h1>
              <h1>•••</h1>
            </button>
          </li>
        </ul>
      </footer>
    </aside>
  );
};

export default SideBar;
