import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { useSelector } from 'react-redux';
import {defaultCenterMap, mapBoxAccessToken} from '../../config';
import {activeColor, basicColor, calculateTotalBbox, displayPolygons, removeSatelliteTile, renderTile} from '../../utils/maps';
import {serverBaseURL} from '../../services/api/index';

const authTokenSelector = state => state.auth.token;

const MapBox = ({ polygons, activePolygon, setActivePolygon, selectedPolygon, selectedImage, selectedLayer }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [initialised, setInitialised] = useState(false);
  const [tile, setTile] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const token = useSelector(authTokenSelector);

  const initialiseMap = () => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: polygons.length ? polygons[0].center : defaultCenterMap, // TODO
      zoom: 9,
      accessToken: mapBoxAccessToken,
      fitBoundsOptions: {
        duration: 0
      },
      bounds: mapBounds,
      transformRequest: (url, resourceType) => {
        if (resourceType === 'Tile' && url.indexOf(serverBaseURL) > -1) {
          return {
            url: url,
            headers: { 'Authorization': 'Bearer ' + token },
          }
        }
      },
    });
    // if (mapBounds) {
    //   map.current.setBounds(mapBounds);
    // }
    map.current.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'top-left');
    map.current.on('load', function () {
      setInitialised(true);
    })
  }

  useEffect(() => {
    if (polygons && polygons.length) {
      let bbox = calculateTotalBbox(polygons);
      let southWest = new mapboxgl.LngLat(bbox[0][0], bbox[0][1]);
      let northEast = new mapboxgl.LngLat(bbox[1][0], bbox[1][1]);
      let boundingBox = new mapboxgl.LngLatBounds(southWest, northEast);
      if (map.current) return; // initialize map only once
      initialiseMap();
      setMapBounds(boundingBox);
    }
  }, [polygons])


  useEffect(() => {
    if (initialised) {
      map.current.fitBounds(mapBounds)
    }
  }, [mapBounds])

  useEffect(() => {
    if (selectedImage && selectedLayer) {
      setTile(selectedImage.tile[selectedLayer.value]);
    }
  }, [selectedImage, selectedLayer])

  useEffect(() => {
    if (map.current && tile && initialised) {
      renderTile(map.current, tile)
    }
  }, [tile, initialised])

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
    // TODO - what if no map.current
    if (initialised) {
      if (selectedPolygon) {
      let coordinates = selectedPolygon.geo_json.geometry.coordinates[0];
      let mapBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      coordinates.reduce(function (bounds, coord) {
        mapBounds.extend(coord);
      }, mapBounds);
      map.current.fitBounds(mapBounds, {
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
        removeSatelliteTile(map.current);
        if (mapBounds) {
          map.current.fitBounds(mapBounds)
        }
      }
    }
  }, [selectedPolygon])

  useEffect(() => {
    // if (map.current) return; // initialize map only once
    // initialiseMap();
    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (polygons && map.current && initialised) {
      displayPolygons(map.current, mapBounds, polygons)
    }
  }, [polygons, initialised])

 return (
  <div>
    <div ref={mapContainer} className="map-container map-box-container" />
  </div>
);
}

export default MapBox;