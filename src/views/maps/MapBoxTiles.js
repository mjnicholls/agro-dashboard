import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZvbG92aWsiLCJhIjoiY2txdzNpdWs1MGkwZjJ3cGNrYnZua3I4aCJ9.Le6NapjFYy5FfdDXfBmvrg';
const authTokenSelector = state => state.auth.token;


const MapBox = ({ polygon, selectedImage, selectedLayer  }) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const zoom = 9;
  const [initialised, setInitialised] = useState(false);
  const token = useSelector(authTokenSelector);
  const [tile, setTile] = useState(null);

  useEffect(() => {
    if (selectedImage && selectedLayer) {
      setTile(selectedImage.tile[selectedLayer.value])
    }
  }, [selectedImage, selectedLayer])

  useEffect(() => {
    if (map.current && tile && initialised) {
      renderTile(map.current, tile)
    }
  }, [tile, initialised])

  useEffect(() => {
    if (map.current && initialised && polygon)
      addPolygon(map.current)
  }, [polygon])

  const renderTile = (map, tileUrl) => {
    let sourceId = 'satellite';
    if (map.getLayer(sourceId)) {
        map.removeLayer(sourceId);
    }

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    map.addSource(sourceId, {
      'type': 'raster',
      'tiles': [ tileUrl ],
      'tileSize': 256
    });

    map.addLayer(
      {
        'id': sourceId,
        'type': 'raster',
        'source': sourceId,
        'paint': {}
      },
        'aeroway-line'
      );
  }

  const addPolygon = (map) => {

    let sourceId = 'polygon';

    if (map.getLayer(sourceId)) {
        map.removeLayer(sourceId);
    }

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId);
    }

    let coordinates = polygon.geo_json.geometry.coordinates[0];
    let polygonBounds = coordinates.reduce(function (bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    map.fitBounds(polygonBounds, {
      padding: 20
    })

    map.addSource(sourceId, {
      type: 'geojson',
      data: polygon.geo_json
    })

    // Add an outline around the polygon.
    map.addLayer({
      'id': sourceId,
      'type': 'line',
      'source': sourceId,
      'layout': {},
      'paint': {
      'line-color': '#0080ff',
      'line-width': 3
      }
    });
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      transformRequest: (url, resourceType) => {
        if (url.indexOf('http://k8s-eu4.owm.io' > -1)) { // TODO through base url
          return {
            url: url,
            headers: { 'Authorization': 'Bearer ' + token },
          }
        }
      },
      style: 'mapbox://styles/mapbox/streets-v11',
      center: polygon.center,
      zoom: zoom
    });
    map.current.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'top-left');
    map.current.on('load', function () {
      addPolygon(map.current);
    })

    map.current.on('zoomend', function ()
      {
        setInitialised(true)
      });

});

 return (
  <div>
    <div ref={mapContainer} className="map-container map-box-container" />
  </div>
);
}

export default MapBox;