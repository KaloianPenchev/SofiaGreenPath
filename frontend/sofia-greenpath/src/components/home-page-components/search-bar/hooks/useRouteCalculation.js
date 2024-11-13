import { useState, useCallback } from 'react';
import axios from 'axios';
import L from 'leaflet';
import startIconUrl from '../../../../assets/home-page-images/start-location.png'; 
import endIconUrl from '../../../../assets/home-page-images/end-location.png';   

export const useRouteCalculation = (mapRef, pollutionLevels) => {
  const [routeLayer, setRouteLayer] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const startIcon = L.icon({
    iconUrl: startIconUrl,
    iconSize: [25, 32],
    iconAnchor: [16, 32]
  });

  const endIcon = L.icon({
    iconUrl: endIconUrl,
    iconSize: [25, 32],
    iconAnchor: [16, 32]
  });

  const getPollutionColor = (value) => {
    if (value > 100) return '#800080';
    if (value > 75) return '#ff0000';
    if (value > 50) return '#ff7e00';
    if (value > 25) return '#ffff00';
    return '#00ff00';
  };

  const getSegmentColor = (startLat, startLng, endLat, endLng) => {
    
    if (!pollutionLevels || pollutionLevels.length === 0) {
      return '#0066CC'; 
    }

    for (const level of pollutionLevels) {
      const circleCenter = L.latLng(level.lat, level.lon);
      const startPoint = L.latLng(startLat, startLng);
      const endPoint = L.latLng(endLat, endLng);

      
      const startDistance = circleCenter.distanceTo(startPoint);
      const endDistance = circleCenter.distanceTo(endPoint);

      if (startDistance < 400 || endDistance < 400) {
        return getPollutionColor(level.value);
      }
    }
    return '#0066CC'; 
  };

  const calculateRoute = useCallback(async (start, end, isCleanlinessChecked) => {
  if (!start || !end || !mapRef?.current) return;

  
  if (!pollutionLevels || pollutionLevels.length === 0) {
    return; 
  }

  setIsCalculating(true);

  try {
    const response = await axios.get(`https://router.project-osrm.org/route/v1/bike/${start.coordinates.lng},${start.coordinates.lat};${end.coordinates.lng},${end.coordinates.lat}?overview=full&geometries=geojson`);
    if (response.data.routes && response.data.routes[0]) {
      const routeCoordinates = response.data.routes[0].geometry.coordinates;

      if (routeLayer) mapRef.current.removeLayer(routeLayer);

      const newRouteLayer = L.layerGroup();

      
      for (let i = 0; i < routeCoordinates.length - 1; i++) {
        const [startLng, startLat] = routeCoordinates[i];
        const [endLng, endLat] = routeCoordinates[i + 1];

        
        const color = isCleanlinessChecked ? getSegmentColor(startLat, startLng, endLat, endLng) : '#0066CC';

        
        L.polyline([[startLat, startLng], [endLat, endLng]], {
          color,
          weight: 6,
          opacity: 1,
        }).addTo(newRouteLayer);
      }

      newRouteLayer.addTo(mapRef.current);
      setRouteLayer(newRouteLayer);
      if (newRouteLayer.getBounds) {
        mapRef.current.fitBounds(newRouteLayer.getBounds(), { padding: [50, 50] });
      }
    }
  } catch (error) {
    console.error('Error calculating route:', error);
  } finally {
    setIsCalculating(false);
  }
}, [routeLayer, mapRef, pollutionLevels]);

  const addStartMarker = useCallback((coordinates) => {
    if (!mapRef?.current) return;
    if (startMarker) mapRef.current.removeLayer(startMarker);
    const marker = L.marker([coordinates.lat, coordinates.lng], { icon: startIcon, title: "Start Location" }).addTo(mapRef.current);
    setStartMarker(marker);
  }, [startMarker, mapRef, startIcon]);

  const addEndMarker = useCallback((coordinates) => {
    if (!mapRef?.current) return;
    if (endMarker) mapRef.current.removeLayer(endMarker);
    const marker = L.marker([coordinates.lat, coordinates.lng], { icon: endIcon, title: "End Location" }).addTo(mapRef.current);
    setEndMarker(marker);
  }, [endMarker, mapRef, endIcon]);

  const clearRouteAndMarkers = useCallback(() => {
    if (routeLayer) mapRef.current.removeLayer(routeLayer);
    if (startMarker) mapRef.current.removeLayer(startMarker);
    if (endMarker) mapRef.current.removeLayer(endMarker);
    setRouteLayer(null);
    setStartMarker(null);
    setEndMarker(null);
  }, [routeLayer, startMarker, endMarker, mapRef]);

  return {
    calculateRoute,
    isCalculating,
    addStartMarker,
    addEndMarker,
    clearRouteAndMarkers
  };
};