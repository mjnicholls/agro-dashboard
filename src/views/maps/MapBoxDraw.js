import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {axiosInstance} from '../../services/base'
import { useDispatch, useSelector } from 'react-redux';
import {defaultCenterMap} from '../../config'
import {fetchPolygons} from "../../features/polygons/actions";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZvbG92aWsiLCJhIjoiY2txdzNpdWs1MGkwZjJ3cGNrYnZua3I4aCJ9.Le6NapjFYy5FfdDXfBmvrg';

const selectPolygons = state => state.polygons;

const convertToTurfFeature = (feature) => {
  var featureGeometry = feature.getGeometry();
  var geometryType = featureGeometry.getType();
  var featureCoords = geometryType.startsWith("Multi") ?
featureGeometry.getCoordinates()[0][0] : featureGeometry.getCoordinates()[0];
  var turfFeature = turf.polygon([featureCoords]);
  return turfFeature;
}

const selfIntersectOnDraw = (editedFeature) => {
    var turfPolygon = convertToTurfFeature(editedFeature);
    var kinks = turf.kinks(turfPolygon);
    return kinks;
}

const MapBox = ({setArea, setGeoJson, setIntersection, drawRef}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [apiCallCount, setApiCallCount] = React.useState(0);
  const zoom = 9;
  const [initialised, setInitialised] = useState(false);

  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();

  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  useEffect(() => {
    if (polygons && map.current && initialised) {
      addPolygons(map.current)
    }
  }, [polygons, initialised])

  useEffect(() => {
    initialiseMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  }, []);

  const nominatimGeocoder = (query) => {
    /** Load custom data to supplement the search results */
    return axiosInstance.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`)
      .then(response => {
        let features = [];
        for (let i=0; i < response.data.length; i++) {
          let feature = response.data[i];
          feature['place_name'] = feature["display_name"];
          feature['center'] = [feature.lon, feature.lat];
          feature['place_type'] = feature.type;
          features.push(feature);
        }
        return features
      })
      .catch(err => {
        console.log(err)
        return []
      })
  }

  const dummyLocalSearch = () => {
    /** Dummy function to be able to set localGeocoderOnly to true to avoid using mapbox geocoder **/
    return [];
  }

  const initialiseMap = () => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: polygons.length ? polygons[0].center : defaultCenterMap,
      zoom: zoom
    });
    map.current.on('load', function () {
      setInitialised(true);
      addPolygons(map.current);
    })
    map.current.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      autocomplete: false,
      minLength: 3,
      externalGeocoderOnly: true,
      marker: false,
      localGeocoderOnly: true,
      localGeocoder: dummyLocalSearch,
      externalGeocoder: nominatimGeocoder,
    }), 'top-left')

    map.current.addControl(new mapboxgl.NavigationControl({showCompass: false}), 'top-right');

    addDrawFunctionality(map.current);
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

  const deleteArea = () => {
      setArea(null);
      setGeoJson(null);
    }

  const updateArea = () => {
    let data = drawRef.current.getAll();
    if (data.features.length > 0) {
      let area = (turf.area(data) / 10000).toFixed(2);
      let poly = turf.polygon(data.features[0].geometry.coordinates, { name: 'poly1'});
      let intersections = turf.kinks(poly);
      setArea(area);
      setGeoJson(data.features[0]);
      setIntersection(intersections.features.length > 0)
    }
  }

  const deletePreviousAreas = () => {
    const data = drawRef.current.getAll();
    if (drawRef.current.getMode() === 'draw_polygon') {
      let oldPolygonIds = []
      const newPolygonId = data.features[data.features.length - 1].id;
      data.features.forEach((f) => {
        if (f.geometry.type === 'Polygon' && f.id !== newPolygonId) {
          oldPolygonIds.push(f.id)
        }
      })
      if (oldPolygonIds.length) {
        drawRef.current.delete(oldPolygonIds);
        deleteArea();
      }
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
    map.on('draw.modechange', deletePreviousAreas);
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container map-box-container" />
    </div>
  );
}

export default MapBox;