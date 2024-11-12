import { useState } from 'react';
import '../../../styles/home-page-components-styles/search-bar/SearchBar.css';
import SearchBox from './SearchBox';
import ExpandedSearchBox from './ExpandedSearchBox';
import RouteOptions from './RouteOptions';
import { useSearchLocations } from './hooks/useSearchLocations';
import { useOsmSuggestions } from './hooks/useOsmSuggestions';
import { useRouteCalculation } from './hooks/useRouteCalculation';
import axios from 'axios';

const SearchBar = ({ map, onSearchComplete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { calculateRoute, isCalculating, addStartMarker, addEndMarker, clearRouteAndMarkers } = useRouteCalculation(map);

  const {
    firstDestination,
    secondDestination,
    setFirstDestination,
    setSecondDestination,
    selectedFirst,
    selectedSecond,
    isExpanded,
    setIsExpanded,
    handleSuggestionClick,
    handleDirectionClick,
    handleSwapLocations,
    handleClearForm,
    handleCollapseForm,
    canShowRoute
  } = useSearchLocations(clearRouteAndMarkers, addStartMarker, addEndMarker);

  const {
    suggestions,
    activeInput,
    handleInputChange,
    handleKeyPress,
    clearSuggestions
  } = useOsmSuggestions();

  const handleOptionsClick = () => setShowOptions((prev) => !prev);

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) => 
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (canShowRoute) {
      await calculateRoute(selectedFirst, selectedSecond);
      const search = `${selectedFirst.displayName} - ${selectedSecond.displayName}`;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Token not found");
          alert("You need to log in to save recent searches.");
          return;
        }

        console.log("Saving recent search with token:", token);
        await axios.post(
          'http://localhost:5000/user/recentSearches', 
          { search }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        onSearchComplete();
      } catch (error) {
        console.error("Error saving recent search:", error.message || error);
        alert("Error: Unable to save search.");
      }
    }
  };

  const handleSuggestionSelection = (displayName, inputType, coordinates) => {
    handleSuggestionClick(displayName, inputType, coordinates);
    clearSuggestions();

    if (inputType === 'first') {
      clearRouteAndMarkers();
      addStartMarker(coordinates);
      setSecondDestination('');
    } else if (inputType === 'second') {
      addEndMarker(coordinates);
    }
  };

  return (
    <header className={`search-bar ${isExpanded ? 'expanded' : ''}`}>
      <form onSubmit={handleSearchClick} onKeyPress={(e) => handleKeyPress(e, suggestions, activeInput, handleSuggestionSelection)}>
        {!isExpanded ? (
          <SearchBox 
            destination={firstDestination}
            handleInputChange={(e) => {
              setFirstDestination(e.target.value);
              handleInputChange(e, 'first');
            }}
            suggestions={activeInput === 'first' ? suggestions : []}
            handleSuggestionClick={handleSuggestionSelection}
            isLocationSelected={!!selectedFirst}
            onDirectionClick={handleDirectionClick}
          />
        ) : (
          <>
            <ExpandedSearchBox 
              firstDestination={firstDestination}
              secondDestination={secondDestination}
              handleInputChange={(e, inputType) => {
                if (inputType === 'first') {
                  setFirstDestination(e.target.value);
                } else {
                  setSecondDestination(e.target.value);
                }
                handleInputChange(e, inputType);
              }}
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionSelection}
              activeInput={activeInput}
              onSwap={handleSwapLocations}
              onClear={handleCollapseForm}
            />
            <RouteOptions 
              showOptions={showOptions}
              handleOptionsClick={handleOptionsClick}
              selectedFilters={selectedFilters}
              handleFilterClick={handleFilterClick}
              canCalculateRoute={canShowRoute}
              isCalculating={isCalculating}
              onSearchClick={handleSearchClick}
            />
          </>
        )}
      </form>
    </header>
  );
};

export default SearchBar;
