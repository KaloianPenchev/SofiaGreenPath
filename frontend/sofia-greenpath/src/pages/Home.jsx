import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../src/styles/main-pages/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassLocation, faGlobe, faGear, faBars, faBookmark } from '@fortawesome/free-solid-svg-icons';
import MapLayers from '../components/home-page-components/maplayers/MapLayers';
import SideBar from '../components/home-page-components/SideBar';
import SearchBar from '../components/home-page-components/search-bar/SearchBar';
import axios from 'axios';

const Home = () => {
  const mapCenter = [42.6977, 23.3219];
  const zoom = 12.5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [pollutionLevels, setPollutionLevels] = useState([]); 
  const mapRef = useRef(null);
  const navigate = useNavigate();

  const handleSidebarToggle = (section = null) => {
    setIsSidebarOpen(true);
    setExpandedSection(section);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setExpandedSection(null);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchRecentSearches = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:5000/user/recentSearches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentSearches(response.data);
    } catch (error) {
      console.error("Error fetching recent searches:", error.message);
    }
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

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
    fetchRecentSearches();
    fetchFavorites();
  }, []);

  
  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const response = await axios.get('https://data.sensor.community/airrohr/v1/filter/area=42.7,23.3,10');
        const levels = response.data
          .map((entry) => {
            const pm10 = entry.sensordatavalues.find((val) => val.value_type === "P1");
            const pm25 = entry.sensordatavalues.find((val) => val.value_type === "P2");
            return pm10 || pm25
              ? {
                  lat: parseFloat(entry.location.latitude),
                  lon: parseFloat(entry.location.longitude),
                  pm10: pm10 ? parseFloat(pm10.value) : null,
                  pm25: pm25 ? parseFloat(pm25.value) : null,
                  value: pm10 ? parseFloat(pm10.value) : pm25 ? parseFloat(pm25.value) : null,
                }
              : null;
          })
          .filter(Boolean);
        setPollutionLevels(levels); 
      } catch (error) {
        console.error("Error fetching pollution data:", error);
      }
    };

    fetchPollutionData();
  }, []); 

  return (
    <main className="home">
      <aside className="navigation-sidebar">
        <nav>
          <ul>
            <li>
              <button className="icon-button menu-button" onClick={() => handleSidebarToggle()}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
            <li>
              <button className="icon-button bookmark-button" onClick={() => handleSidebarToggle('recent')}>
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
              </button>
              <h1 className="icon-text">Скорошни</h1>
            </li>
            <li>
              <button className="icon-button location-button" onClick={() => handleSidebarToggle('favorite')}>
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <h1 className="icon-text">Любими</h1>
            </li>
          </ul>
          <ul>
            <li>
              <button className="language-button">
                <FontAwesomeIcon icon={faGlobe} />
                <h1 className="language-button-text">BG</h1>
              </button>
            </li>
            <li>
              <button className="icon-button gear-button">
                <FontAwesomeIcon icon={faGear} />
              </button>
              <h1 className="icon-text">Настройки</h1>
            </li>
          </ul>
        </nav>
      </aside>

      {isSidebarOpen && (
        <section className="sidebar-overlay" onClick={handleSidebarClose} />
      )}

      <SideBar 
        isOpen={isSidebarOpen} 
        onClose={handleSidebarClose} 
        recentSearches={recentSearches} 
        fetchRecentSearches={fetchRecentSearches}
        expandedSection={expandedSection}
        favorites={favorites}
        fetchFavorites={fetchFavorites}
      />

      
      <SearchBar map={mapRef} onSearchComplete={fetchRecentSearches} pollutionLevels={pollutionLevels} />

      <section className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          zoomControl={false}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomright"/>
        </MapContainer>
        <MapLayers mapRef={mapRef} pollutionLevels={pollutionLevels} />
      </section>
    </main>
  );
};

export default Home;
