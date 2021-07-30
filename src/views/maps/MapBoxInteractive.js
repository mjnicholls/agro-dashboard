import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import {activeColor, basicColor, initialiseMap, removeSatelliteLayer, renderSatelliteImage} from '../../utils/maps';
import {getMapBounds} from '../../features/polygons/selectors'

const MapBox = ({ polygons, activePolygon, setSelectedPolygon, selectedPolygon, selectedImage, selectedLayer }) => {

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
    initialiseMap(mapContainer.current, map, mapBounds, () => {setInitialised(true)}, setSelectedPolygon)
  }, [polygons]);

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (selectedImage && selectedLayer) {
      setTile(selectedImage.tile[selectedLayer.value]);
    }
  }, [selectedImage, selectedLayer])

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
      if (selectedPolygon) {
      // let coordinates = selectedPolygon.geo_json.geometry.coordinates[0];
      // let mapBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      // coordinates.reduce(function (bounds, coord) {
      //   mapBounds.extend(coord);
      // }, mapBounds);
      map.current.fitBounds(selectedPolygon.bbox, {
        padding: 20
      });
      for (let i=0; i<polygons.length; i++) {
        map.current.setPaintProperty("layer_" + polygons[i].id, "fill-opacity", polygons[i].id === selectedPolygon.id ? 0 : 0.5)
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
  }, [selectedPolygon])

 return (
  <div>
    <div ref={mapContainer} className="map-container map-box-container" />
  </div>
);
}

export default MapBox;