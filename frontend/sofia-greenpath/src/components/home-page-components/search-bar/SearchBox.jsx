import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faXmark, faDiamondTurnRight, faRotate } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/home-page-components-styles/search-bar/InitialSearchBox.css';

const SearchBox = ({ 
  destination, 
  handleInputChange, 
  suggestions, 
  handleSuggestionClick,
  inputType = 'first',
  placeholder = "Начало ...",
  showDirectionIcon = true,
  showXmarkIcon = false,
  showRotateIcon = false,
  className = "initial-form",
  style = {},
  isLocationSelected = false,
  onDirectionClick,
  onXmarkClick,
  onRotateClick
}) => {
  return (
    <section className={className}>
      <label className="search-input-container">
        <FontAwesomeIcon icon={faLocationDot} className="location-icon" style={style}/>
        <input 
          type="text" 
          placeholder={placeholder} 
          className="search-input"
          value={destination}
          onChange={(e) => handleInputChange(e, inputType)}
        />
        {showDirectionIcon && (
          <FontAwesomeIcon 
            icon={faDiamondTurnRight} 
            className={`direction-icon ${isLocationSelected ? 'active' : 'disabled'}`}
            onClick={() => isLocationSelected && onDirectionClick?.()}
          />
        )}
        {showXmarkIcon && (
          <FontAwesomeIcon 
            icon={faXmark} 
            className="xmark-icon" 
            onClick={onXmarkClick}
          />
        )}
        {showRotateIcon && (
          <FontAwesomeIcon 
            icon={faRotate} 
            className="rotate-icon" 
            onClick={onRotateClick}
          />
        )}
      </label>
      {suggestions.length > 0 && (
        <section className="suggestions-container">
          <ul>
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.id}
                onClick={() => handleSuggestionClick(
                  suggestion.display_name,
                  inputType,
                  suggestion.coordinates
                )}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default SearchBox;