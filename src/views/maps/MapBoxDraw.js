import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { useDispatch, useSelector } from 'react-redux';
import {defaultCenterMap} from '../../config'
import {fetchPolygons} from "../../features/polygons/actions";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import collect from '@turf/collect';
import * as turf from '@turf/turf'

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZvbG92aWsiLCJhIjoiY2txdzNpdWs1MGkwZjJ3cGNrYnZua3I4aCJ9.Le6NapjFYy5FfdDXfBmvrg';

const selectPolygons = state => state.polygons;

const MapBox = ({setArea, setGeoJson, drawRef}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const draw = useRef(null);
  const [apiCallCount, setApiCallCount] = React.useState(0);
  const [zoom, setZoom] = useState(9);
  const [initialised, setInitialised] = useState(false);

  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();

  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  const addPolygons = (map) => {
    let mapBounds;
    for (let i=0; i<polygons.length; i++) {
      let polygon = polygons[i];
      // Add a data source containing GeoJSON data.
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
        'fill-color': '#0080ff', // blue color fill
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
        'line-color': '#0080ff',
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

  const addDrawFunctionality = (map) => {
    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        },
        defaultMode: 'draw_polygon'
      });
    map.addControl(drawRef.current, 'top-right');

    map.on('draw.create', updateArea);
    map.on('draw.delete', deleteArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
      let data = drawRef.current.getAll();
      if (data.features.length > 0) {
        let area = (turf.area(data) / 1000).toFixed(2);
        setArea(area);
        setGeoJson(data.features[0]);
      }
    }

    function deleteArea() {
      setArea(null);
      setGeoJson(null);
    }

  }

  useEffect(() => {
    if (polygons && map.current && initialised) {
      addPolygons(map.current)
    }
  }, [polygons, initialised])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: polygons.length ? polygons[0].center : defaultCenterMap,
      zoom: zoom
    });
    map.current.on('load', function () {
      setInitialised(true);
      addPolygons(map.current)
    })
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    addDrawFunctionality(map.current);

  });

  useEffect(() => {
    // let data = draw.getAll();
    // if (data.features.length > 0) {
    //   draw.deleteAll()
    // }
  }, [polygons])

 return (
    <div>
      <div ref={mapContainer} className="map-container map-box-container" />
    </div>
  );
}

export default MapBox;