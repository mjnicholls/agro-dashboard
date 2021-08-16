import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  activeColor, addClusters, basicColor, displayPolygons, initialiseMap, removeSatelliteLayer,
  renderSatelliteImage
} from './base';
import {getMapBounds} from '../../features/polygons/selectors'
import SatelliteImagesList from "../agro-components/SatelliteImagesList";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

//activePolygon
const MapBox = ({ satelliteImage, setSatelliteImage, satelliteLayer, isSatellitePage, setPolygonInFocus }) => {

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [tile, setTile] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const mapBounds = useSelector(getMapBounds);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);

  useEffect(() => {
    if (!initialised) {
      // first initialisation of the map
      initialiseMap(mapContainer.current, map, mapBounds, () => {setInitialised(true)}, setPolygonInFocus)
    } else {
      // new polygon has been added
      displayPolygons(map.current, mapBounds, polygons);
      addClusters(map.current, polygons);
    }
  }, [polygons]);

  useEffect(() => {
    return () => {
      if (map.current) {
        setInitialised(false);
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (satelliteImage && satelliteLayer) {
      setTile(satelliteImage.tile[satelliteLayer.value]);
    }
  }, [satelliteImage, satelliteLayer])

  useEffect(() => {
    if (tile) {
      renderSatelliteImage(map.current, tile)
    }
  }, [tile])

  useEffect(() => {
    if (activePolygon) {
      let layers = map.current.getStyle().layers;
      for (let i=0; i< layers.length; i++) {
        if (layers[i].id.startsWith("layer_")) {
          map.current.setPaintProperty(layers[i].id, 'fill-color',
          layers[i].id === "layer_" + activePolygon ? activeColor : basicColor);
        }
      }
    }
  }, [activePolygon])

  useEffect(() => {
    /** On polygon select:
     * zoom to the polygon
     * apply satellite image
     * apply layer
     */
    if (initialised) {
      if (activePolygon) {
      map.current.fitBounds(activePolygon.bbox, {
        padding: {left: 20, right: 20, top: 20, bottom: 100}
      });
      for (let i=0; i<polygons.length; i++) {
        map.current.setPaintProperty("layer_" + polygons[i].id, "fill-opacity", polygons[i].id === activePolygon.id ? 0 : 0.5)
      }
    }
      else {
        for (let i=0; i<polygons.length; i++) {
          map.current.setPaintProperty("layer_" + polygons[i].id, "fill-opacity", 0.5)
        }
        removeSatelliteLayer(map.current);
        map.current.fitBounds(mapBounds);
        // if (mapBounds) {
        //   map.current.fitBounds(mapBounds)
        // }
      }
    }
  }, [activePolygon])

  useEffect(() => {
    if (initialised) {
      if (isSatelliteMode && tile) {
        renderSatelliteImage(map.current, tile)
      } else {
        removeSatelliteLayer(map.current);
      }
    }

  }, [isSatelliteMode, tile])

 return (
  <div className="mb-5">
    <div ref={mapContainer} className="map-container map-box-container" >
    {(activePolygon && isSatellitePage) &&
      <SatelliteImagesList
        satelliteImage={satelliteImage}
        setSatelliteImage={setSatelliteImage}
      />}
    </div>
  </div>
);
}

export default MapBox;