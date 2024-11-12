import { useState } from 'react';
import '../../../styles/home-page-components-styles/search-bar/SearchBar.css';
import SearchBox from './SearchBox';
import ExpandedSearchBox from './ExpandedSearchBox';
import RouteOptions from './RouteOptions';
import { useSearchLocations } from './hooks/useSearchLocations';
import { useOsmSuggestions } from './hooks/useOsmSuggestions';
import { useRouteCalculation } from './hooks/useRouteCalculation';
import axios from 'axios';

const SearchBar = ({ map, onSearchComplete, pollutionLevels }) => {
  const [isCleanlinessChecked, setIsCleanlinessChecked] = useState(false);

  const { calculateRoute, isCalculating, addStartMarker, addEndMarker, clearRouteAndMarkers } = useRouteCalculation(map, pollutionLevels);

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

  const handleSearchClick = async (e) => {
    e.preventDefault();
    if (canShowRoute) {
      console.log(`Searching route with cleanliness checked: ${isCleanlinessChecked}`);
      await calculateRoute(selectedFirst, selectedSecond, isCleanlinessChecked);
      const search = `${selectedFirst.displayName} - ${selectedSecond.displayName}`;
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        console.log('Saving recent search:', search);
        await axios.post('http://localhost:5000/user/recentSearches', { search }, { headers: { Authorization: `Bearer ${token}` } });
        onSearchComplete();
      } catch (error) {
        console.error('Error saving search:', error);
      }
    } else {
      console.log('Cannot show route, conditions not met');
    }
  };

  const handleSuggestionSelection = (displayName, inputType, coordinates) => {
    console.log(`Suggestion selected for ${inputType}: ${displayName} at [${coordinates.lat}, ${coordinates.lng}]`);
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
          <SearchBox destination={firstDestination} handleInputChange={(e) => { setFirstDestination(e.target.value); handleInputChange(e, 'first'); }} suggestions={activeInput === 'first' ? suggestions : []} handleSuggestionClick={handleSuggestionSelection} isLocationSelected={!!selectedFirst} onDirectionClick={handleDirectionClick} />
        ) : (
          <>
            <ExpandedSearchBox firstDestination={firstDestination} secondDestination={secondDestination} handleInputChange={(e, inputType) => { if (inputType === 'first') { setFirstDestination(e.target.value); } else { setSecondDestination(e.target.value); } handleInputChange(e, inputType); }} suggestions={suggestions} handleSuggestionClick={handleSuggestionSelection} activeInput={activeInput} onSwap={handleSwapLocations} onClear={handleCollapseForm} />
            <RouteOptions isCleanlinessChecked={isCleanlinessChecked} setIsCleanlinessChecked={(checked) => { console.log(`Cleanliness checked changed: ${checked}`); setIsCleanlinessChecked(checked); }} canCalculateRoute={canShowRoute} isCalculating={isCalculating} onSearchClick={handleSearchClick} />
          </>
        )}
      </form>
    </header>
  );
};

export default SearchBar;
