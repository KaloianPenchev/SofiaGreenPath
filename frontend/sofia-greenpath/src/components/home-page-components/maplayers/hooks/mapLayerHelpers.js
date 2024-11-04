import L from 'leaflet';
import sensorUrl from '../../../../assets/home-page-images/sensor1.png';

export const renderBicycleLanes = (map, bicycleData) => {
  if (!map || !bicycleData || !bicycleData.elements) return;

  const geoJsonData = {
    type: "FeatureCollection",
    features: bicycleData.elements.map((el) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: el.geometry.map((coord) => [coord.lon, coord.lat]),
      },
      properties: {},
    })),
  };
  L.geoJSON(geoJsonData, { style: { color: '#03dbfc', weight: 2 } }).addTo(map);
};

export const renderPollutionStations = (map, stations) => {
  if (!map || !stations) return;

  stations.forEach((station) => {
    L.marker([station.lat, station.lon], {
      icon: L.icon({ iconUrl: sensorUrl, iconSize: [15, 20] }),
    }).addTo(map);
  });
};

export const renderPollutionLevels = (map, pollutionLevels) => {
  if (!map || !pollutionLevels) return;

  pollutionLevels.forEach((level) => {
    L.circle([level.lat, level.lon], {
      radius: 400,
      color: getPollutionColor(level.value),
    }).addTo(map);
  });
};

const getPollutionColor = (value) => {
  if (value > 100) return '#800080';
  if (value > 75) return '#ff0000';   
  if (value > 50) return '#ff7e00';   
  if (value > 25) return '#ffff00';   
  return '#00ff00';                   
};
