// useOsmSuggestions.js

import { useState, useCallback } from 'react';
import axios from 'axios';

export const useOsmSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const fetchOsmSuggestions = useCallback(async (query) => {
    if (query.length > 2) {
      try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 5,
            'accept-language': 'bg',
            viewbox: '23.212,42.725,23.426,42.619',
            bounded: 1,
          },
        });
        return response.data.map((location) => ({
          id: location.place_id,
          display_name: location.display_name,
          coordinates: {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon)
          }
        }));
      } catch (error) {
        console.error('Error fetching OSM suggestions:', error);
        return [];
      }
    }
    return [];
  }, []);

  const handleInputChange = useCallback(async (e, inputType) => {
    const value = e.target.value;
    setActiveInput(inputType);
    
    if (value.length > 2) {
      const results = await fetchOsmSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [fetchOsmSuggestions]);

  const handleKeyPress = useCallback((e, suggestions, activeInput, handleSuggestionSelection) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      const firstSuggestion = suggestions[0];
      handleSuggestionSelection(
        firstSuggestion.display_name,
        activeInput,
        firstSuggestion.coordinates
      );
      setSuggestions([]);
      setActiveInput(null);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setActiveInput(null);
  }, []);

  return {
    suggestions,
    activeInput,
    handleInputChange,
    handleKeyPress,
    clearSuggestions
  };
};
