import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { useDispatch, useSelector } from 'react-redux';
import {defaultCenterMap} from '../../config'
import {fetchPolygons} from "../../features/polygons/actions";

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZvbG92aWsiLCJhIjoiY2txdzNpdWs1MGkwZjJ3cGNrYnZua3I4aCJ9.Le6NapjFYy5FfdDXfBmvrg';

const selectPolygons = state => state.polygons;

const MapBoxGlMap = ({ selectedPolygon, selectPolygon }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [apiCallCount, setApiCallCount] = React.useState(0);
  const [initialised, setInitialised] = useState(false);
  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();
  const zoom = 9;

  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  const basicColor = '#0080ff';
  const activeColor = '#e14eca';

  useEffect(() => {
    if (selectedPolygon) {
      let layers = map.current.getStyle().layers;
      for (let i=0; i< layers.length; i++) {
        if (layers[i].id.startsWith("layer_")) {
          map.current.setPaintProperty(layers[i].id, 'fill-color',
          layers[i].id === "layer_" + selectedPolygon ? activeColor : basicColor);
        }
      }
    }
  }, [selectedPolygon])

  const addPolygons = (map) => {
    let mapBounds;
    for (let i=0; i<polygons.length; i++) {
      let polygon = polygons[i];
      let coordinates = polygon.geo_json.geometry.coordinates[0];

      if (!mapBounds) {
        mapBounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
      }

      let polygonBounds = coordinates.reduce(function (bounds, coord) {
        mapBounds.extend(coord);
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      if (map.getSource(polygon.id)) {
        continue
      }

      map.addSource(polygon.id, {
        type: 'geojson',
        data: polygon.geo_json
      })

      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': "layer_" + polygon.id,
        'type': 'fill',
        'source': polygon.id, // reference the data source
        'layout': {},
        'paint': {
        'fill-color': basicColor, // blue color fill
        'fill-opacity': 0.5
        }
      });

      // Add an outline around the polygon.
      map.addLayer({
        'id': 'outline_' + polygon.id,
        'type': 'line',
        'source': polygon.id,
        'layout': {},
        'paint': {
        'line-color': basicColor,
        'line-width': 3
        }
      });
      map.on('mouseenter', "layer_" + polygon.id, function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('click', "layer_" + polygon.id, function (e) {
        map.fitBounds(polygonBounds, {
            padding: 20
          });
        });

      map.on('click', "outline_" + polygon.id, function (e) {
        map.fitBounds(polygonBounds, {
            padding: 20
          });
        });
      }

      if (mapBounds) {
        map.fitBounds(mapBounds, {
          padding: 20
        })
      }

  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: polygons.length ? polygons[0].center : defaultCenterMap,
      zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'top-left');
    map.current.on('load', function () {
      setInitialised(true);
    })
  }, []);

  useEffect(() => {
    if (polygons && map.current && initialised) {
      addPolygons(map.current)
    }
  }, [polygons, initialised])

 return (
  <div>
    <div ref={mapContainer} className="map-container map-box-container" />
  </div>
);
}

export default MapBoxGlMap;