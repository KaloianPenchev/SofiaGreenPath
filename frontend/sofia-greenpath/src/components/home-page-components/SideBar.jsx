import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/home-page-components-styles/sidebar-maplayers-styles/SideBar.css';
import logoIcon from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleQuestion,
  faGear,
  faMagnifyingGlassLocation, 
  faSignOut,
  faBookmark,
  faAngleDown,
  faAngleUp,
  faStar as solidStar,
  faStar as regularStar 
} from '@fortawesome/free-solid-svg-icons';

const SideBar = ({ isOpen, onClose, recentSearches, fetchRecentSearches, expandedSection, favorites, fetchFavorites }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(response.data.username);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const toggleFavorite = async (search) => {
    const token = localStorage.getItem('token');
    if (!token) return;

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

  useEffect(() => {
    fetchFavorites();
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  useEffect(() => {
    if (isOpen) {
      switch (expandedSection) {
        case 'recent':
          setIsSearchExpanded(true);
          setIsFavoritesExpanded(false);
          break;
        case 'favorite':
          setIsSearchExpanded(false);
          setIsFavoritesExpanded(true);
          break;
        default:
          setIsSearchExpanded(false);
          setIsFavoritesExpanded(false);
          break;
      }
    }
  }, [isOpen, expandedSection]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); 
    navigate('/');
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
            <button type="button" className="footer-item user-profile" onClick={handleLogout}>
              <h1>{userName}</h1> {/* Display the username */}
              <FontAwesomeIcon icon={faSignOut} className="sign-out"/>
            </button>
          </li>
        </ul>
      </footer>
    </aside>
  );
};

export default SideBar;
