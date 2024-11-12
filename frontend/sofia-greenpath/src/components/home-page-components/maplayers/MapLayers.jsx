import { useState, useEffect } from 'react';
import '../../../styles/home-page-components-styles/sidebar-maplayers-styles/MapLayers.css';
import layersIcon from '../../../assets/home-page-images/layers.png';
import cyclingIcon from '../../../assets/home-page-images/cycling.png';
import pollutionIcon from '../../../assets/home-page-images/pollution.png';
import stationIcon from '../../../assets/home-page-images/station.png';
import { renderBicycleLanes, renderPollutionStations, renderPollutionLevels } from './hooks/mapLayerHelpers';
import useMapLayerData from './hooks/useMapLayerData';

const MapLayers = ({ mapRef, pollutionLevels }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLayer, setActiveLayer] = useState(null);
  const { bicycleData, pollutionStations} = useMapLayerData();

  const handleLayerClick = (layer) => {
    const map = mapRef.current;
    if (!map || !map.eachLayer) return;

    map.eachLayer((existingLayer) => {
      if (!existingLayer.options.attribution) map.removeLayer(existingLayer);
    });

    if (activeLayer === layer) {
      setActiveLayer(null);
    } else {
      setActiveLayer(layer);

      if (layer === 'bicycle' && bicycleData) {
        renderBicycleLanes(map, bicycleData);
      } else if (layer === 'stations' && pollutionStations) {
        renderPollutionStations(map, pollutionStations);
      } else if (layer === 'pollution' && pollutionLevels) {
        renderPollutionLevels(map, pollutionLevels);
      }
    }
  };

  return (
    <aside className="layers-container" onClick={() => setIsExpanded(!isExpanded)}>
      <nav className="layers-button">
        <figure>
          <img src={layersIcon} alt="Слоеве" className="layer-preview" />
          <figcaption>Слоеве</figcaption>
        </figure>
      </nav>

      {isExpanded && (
        <section className="layers-menu">
          <ul className="layers-grid">
            <li onClick={() => handleLayerClick('bicycle')}>
              <figure>
                <img src={cyclingIcon} alt="Колоездене" />
                <figcaption>Колоездене</figcaption>
              </figure>
            </li>
            <li onClick={() => handleLayerClick('stations')}>
              <figure>
                <img src={stationIcon} alt="Станции" />
                <figcaption>Станции</figcaption>
              </figure>
            </li>
            <li onClick={() => handleLayerClick('pollution')}>
              <figure>
                <img src={pollutionIcon} alt="Замърсяване" />
                <figcaption>Замърсяване</figcaption>
              </figure>
            </li>
          </ul>
        </section>
      )}
    </aside>
  );
};

export default MapLayers;
