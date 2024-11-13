import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSliders, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/home-page-components-styles/search-bar/RouteOptions.css';
import { useState, useCallback } from 'react';

const RouteOptions = ({
  isCleanlinessChecked,
  setIsCleanlinessChecked,
  canCalculateRoute,
  isCalculating,
  onSearchClick
}) => {

  const [isHovered, setIsHovered] = useState(false);
  return (
    <section className="route-options-container">
      <button className="route-options-button" type="button">
        <figure className="button-content">
          <FontAwesomeIcon style={{ fontSize: '0.8rem' }} icon={faSliders} />
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
        <FontAwesomeIcon
          style={{ fontSize: '0.95rem'}}
          icon={faCircleInfo}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="icon-info-1"
        />
        {isHovered && (
          <span className="tooltip">
            Филтъра показва нивото на чистота на въздуха за избрания маршрут.
          </span>
        )}
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
