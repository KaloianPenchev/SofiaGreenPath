import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/home-page-components-styles/search-bar/RouteOptions.css';

const RouteOptions = ({
  showOptions,
  handleOptionsClick,
  selectedFilters = [],  // Ensure default value to avoid undefined error
  handleFilterClick,
  canCalculateRoute,
  isCalculating,
  onSearchClick
}) => {
  return (
    <section className="filtering-section">
      <button 
        className="route-options-button" 
        type="button"
        onClick={handleOptionsClick}
      >
        <figure className="button-content">
          <FontAwesomeIcon icon={faSliders} />
          <figcaption>Опции за маршрут</figcaption>
        </figure>
        <abbr 
          title={showOptions ? 'Close options' : 'Open options'}
          className={`arrow ${showOptions ? 'up' : ''}`}
        >
          ▼
        </abbr>
      </button>

      {showOptions && (
        <nav className="route-options-menu">
          <ul>
            <li 
              className={selectedFilters.includes('shortest') ? 'selected' : ''}
              onClick={() => handleFilterClick('shortest')}
            >
              <p>Най-кратък път</p>
            </li>
            <li 
              className={selectedFilters.includes('pollution') ? 'selected' : ''}
              onClick={() => handleFilterClick('pollution')}
            >
              <p>Ниво на чистота</p>
            </li>
            <li 
              className={selectedFilters.includes('bike') ? 'selected' : ''}
              onClick={() => handleFilterClick('bike')}
            >
              <p>Велоалеи</p>
            </li>
            <li 
              className={selectedFilters.includes('ratings') ? 'selected' : ''}
              onClick={() => handleFilterClick('ratings')}
            >
              <p>Оценки от потребители</p>
            </li>
          </ul>
        </nav>
      )}

      <button 
        className="search-button" 
        type="button"
        onClick={onSearchClick}
        disabled={!canCalculateRoute || isCalculating}
      >
        {isCalculating ? 'Изчисляване...' : 'Търси'}
        <FontAwesomeIcon icon={faArrowRight} className="search-button-icon" />
      </button>
    </section>
  );
};

export default RouteOptions;
