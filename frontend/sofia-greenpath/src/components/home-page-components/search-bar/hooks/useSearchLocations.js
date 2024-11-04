import { useState, useCallback } from 'react';

export const useSearchLocations = (clearRouteAndMarkers, addStartMarker, addEndMarker) => {
  const [firstDestination, setFirstDestination] = useState('');
  const [secondDestination, setSecondDestination] = useState('');
  const [selectedFirst, setSelectedFirst] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSuggestionClick = useCallback((displayName, inputType, coordinates) => {
    if (inputType === 'first') {
      setFirstDestination(displayName);
      setSelectedFirst({ displayName, coordinates });
    } else {
      setSecondDestination(displayName);
      setSelectedSecond({ displayName, coordinates });
    }
  }, []);

  const handleDirectionClick = useCallback(() => {
    if (selectedFirst) {
      setIsExpanded((prev) => !prev);
    }
  }, [selectedFirst]);

  const handleSwapLocations = useCallback(() => {
    const tempDestination = firstDestination;
    setFirstDestination(secondDestination);
    setSecondDestination(tempDestination);

    const tempSelected = selectedFirst;
    setSelectedFirst(selectedSecond);
    setSelectedSecond(tempSelected);

    if (selectedFirst && selectedSecond) {
      clearRouteAndMarkers();
      addStartMarker(selectedSecond.coordinates);
      addEndMarker(selectedFirst.coordinates);
    }
  }, [firstDestination, secondDestination, selectedFirst, selectedSecond, clearRouteAndMarkers, addStartMarker, addEndMarker]);

  const handleClearForm = useCallback(() => {
    setFirstDestination('');
    setSecondDestination('');
    setSelectedFirst(null);
    setSelectedSecond(null);
    setIsExpanded(false);
  }, []);

  const handleCollapseForm = useCallback(() => {
    setIsExpanded(false);
    setSecondDestination('');
    setSelectedSecond(null);
  }, []);

  const canShowRoute = selectedFirst && selectedSecond;

  return {
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
  };
};
