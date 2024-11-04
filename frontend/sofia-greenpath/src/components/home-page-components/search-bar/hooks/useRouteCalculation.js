import { useState, useCallback } from 'react';
import axios from 'axios';
import L from 'leaflet';
import startIconUrl from '../../../../assets/home-page-images/start-location.png'; 
import endIconUrl from '../../../../assets/home-page-images/end-location.png';   

export const useRouteCalculation = (mapRef) => {
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

  const calculateRoute = useCallback(async (start, end) => {
    if (!start || !end || !mapRef?.current) return;

    setIsCalculating(true);
    try {
      const response = await axios.get(`https://router.project-osrm.org/route/v1/bike/${start.coordinates.lng},${start.coordinates.lat};${end.coordinates.lng},${end.coordinates.lat}?overview=full&geometries=geojson`);
      
      if (response.data.routes && response.data.routes[0]) {
        const routeCoordinates = response.data.routes[0].geometry;

        // Clear previous route layer
        if (routeLayer) {
          mapRef.current.removeLayer(routeLayer);
        }

        const newRouteLayer = L.geoJSON(routeCoordinates, {
          style: {
            color: '#0066CC',
            weight: 4,
            opacity: 0.7
          }
        }).addTo(mapRef.current);
        setRouteLayer(newRouteLayer);

        mapRef.current.fitBounds(newRouteLayer.getBounds(), { padding: [50, 50] });
      }
    } catch (error) {
      console.error('Error calculating route:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [routeLayer, mapRef]);

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