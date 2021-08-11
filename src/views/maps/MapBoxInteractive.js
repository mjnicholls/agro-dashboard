import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {activeColor, basicColor, initialiseMap, removeSatelliteLayer, renderSatelliteImage} from './base';
import {getMapBounds} from '../../features/polygons/selectors'
import SatelliteImagesList from "../agro-components/SatelliteImagesList";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;

//activePolygon
const MapBox = ({ satelliteImage, setSatelliteImage, satelliteLayer, isSatellitePage, setPolygonInFocus }) => {

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [tile, setTile] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const mapBounds = useSelector(getMapBounds);

  useEffect(() => {
    // let bbox;
    // if (polygons && polygons.length) {
    //   bbox = calculateTotalBbox(polygons);
    //   setMapBounds(bbox);
    // }
    // if (map.current) {
    //   if (bbox) {
    //     map.current.fitBounds(bbox);
    //   } else { return }  // initialize map only once
    // } else {
    //   initialiseMap(mapContainer.current, map, bbox, () => {setInitialised(true)}, setSelectedPolygon)
    // }
    if (!initialised) {
      initialiseMap(mapContainer.current, map, mapBounds, () => {setInitialised(true)}, setPolygonInFocus)
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
      // let coordinates = selectedPolygon.geo_json.geometry.coordinates[0];
      // let mapBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      // coordinates.reduce(function (bounds, coord) {
      //   mapBounds.extend(coord);
      // }, mapBounds);
      map.current.fitBounds(activePolygon.bbox, {
        padding: 20
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

 return (
  <div>
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