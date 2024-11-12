import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSliders } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/home-page-components-styles/search-bar/RouteOptions.css';

const RouteOptions = ({
  isCleanlinessChecked,
  setIsCleanlinessChecked,
  canCalculateRoute,
  isCalculating,
  onSearchClick
}) => {
  return (
    <section className="route-options-container">
      <button className="route-options-button" type="button">
        <figure className="button-content">
          <FontAwesomeIcon style={{ fontSize: '0.8vw' }} icon={faSliders} />
          <figcaption>Ниво на чистота</figcaption>
        </figure>
        <label className="switch">
          <input
            className="checkbox"
            type="checkbox"
            checked={isCleanlinessChecked}
            onChange={(e) => setIsCleanlinessChecked(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </button>
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
