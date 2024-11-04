import { useEffect, useState } from 'react';
import axios from 'axios';

const useMapLayerData = () => {
  const [bicycleData, setBicycleData] = useState(null);
  const [pollutionStations, setPollutionStations] = useState([]);
  const [pollutionLevels, setPollutionLevels] = useState([]);

  useEffect(() => {
    const fetchBicycleData = async () => {
      try {
        const response = await axios.get(
          'https://overpass-api.de/api/interpreter?data=[out:json];(way["highway"="cycleway"](42.6,23.2,42.8,23.4);way["bicycle"~"yes|designated"](42.6,23.2,42.8,23.4););out geom;'
        );
        setBicycleData(response.data);
      } catch (error) {
        console.error("Error fetching bicycle data:", error);
      }
    };

    const fetchPollutionData = async () => {
      try {
        const response = await axios.get('https://data.sensor.community/airrohr/v1/filter/area=42.7,23.3,10');

        const stations = response.data.map((entry) => ({
          lat: parseFloat(entry.location.latitude),
          lon: parseFloat(entry.location.longitude),
          id: entry.location.id,
        }));

        const levels = response.data
          .map((entry) => {
            const pm10 = entry.sensordatavalues.find((val) => val.value_type === "P1");
            const pm25 = entry.sensordatavalues.find((val) => val.value_type === "P2");
            return pm10 || pm25
              ? {
                  lat: parseFloat(entry.location.latitude),
                  lon: parseFloat(entry.location.longitude),
                  pm10: pm10 ? parseFloat(pm10.value) : null,
                  pm25: pm25 ? parseFloat(pm25.value) : null,
                  value: pm10 ? parseFloat(pm10.value) : pm25 ? parseFloat(pm25.value) : null,
                }
              : null;
          })
          .filter(Boolean);

        setPollutionStations(stations);
        setPollutionLevels(levels);
      } catch (error) {
        console.error("Error fetching pollution data:", error);
      }
    };

    fetchBicycleData();
    fetchPollutionData();
  }, []);

  return { bicycleData, pollutionStations, pollutionLevels };
};

export default useMapLayerData;
