import { useState, useRef, useEffect } from 'react';
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
  const mapRef = useRef(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const fetchRecentSearches = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/user/recentSearches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentSearches(response.data);
    } catch (error) {
      console.error("Error fetching recent searches:", error.response?.data || error.message);
    }
  };

  const fetchFavorites = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/user/favoriteSearches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorite searches:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchRecentSearches();
    fetchFavorites();
  }, []);

  return (
    <main className="home">
      <aside className="navigation-sidebar">
        <nav>
          <ul>
            <li>
              <button className="icon-button menu-button" onClick={handleSidebarToggle}>
                <FontAwesomeIcon icon={faBars} />
              </button>
            </li>
            <li>
              <button className="icon-button bookmark-button">
                <FontAwesomeIcon icon={faBookmark} />
              </button>
              <h1 className="icon-text">Favorites</h1>
            </li>
            <li>
              <button className="icon-button location-button">
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
              </button>
              <h1 className="icon-text">Recent</h1>
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
              <h1 className="icon-text">Settings</h1>
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
      />

      <SearchBar map={mapRef} onSearchComplete={fetchRecentSearches} />

      <section className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          zoomControl={false}
          ref={mapRef} 
          whenCreated={(mapInstance) => { 
            mapRef.current = mapInstance;
            console.log("MapContainer created:", mapInstance);
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomright"/>
        </MapContainer>
        <MapLayers mapRef={mapRef} />
      </section>
    </main>
  );
};

export default Home;
