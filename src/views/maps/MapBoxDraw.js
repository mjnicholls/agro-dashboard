import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {axiosInstance} from '../../services/base'
import { useDispatch, useSelector } from 'react-redux';
import {defaultCenterMap, mapBoxAccessToken} from '../../config'
import {fetchPolygons} from "../../features/polygons/actions";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from '@turf/turf'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {calculateTotalBbox, displayPolygons, initialiseMap} from '../../utils/maps';


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
  const [mapBounds, setMapBounds] = useState(null);
  const [apiCallCount, setApiCallCount] = React.useState(0);
  const [initialised, setInitialised] = useState(false);

  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();

  if (!polygons.length && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    let bbox;
    if (polygons && polygons.length) {
      bbox = calculateTotalBbox(polygons);
      setMapBounds(bbox);
    }
    if (map.current) {
      if (bbox) {
        map.current.fitBounds(bbox);
      } else { return }  // initialize map only once
    } else {
      initialiseMap(mapContainer.current, map, bbox, () => setInitialised(true), () => {})
    }
  }, [polygons]);

  useEffect(() => {
    if (initialised) {
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
    addDrawFunctionality(map.current);
    }
  }, [initialised])

  // useEffect(() => {
  //   if (polygons && map.current && initialised) {
  //     displayPolygons(map.current, mapBounds, polygons, () => {})
  //   }
  // }, [polygons, initialised])


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

  // const initialiseMap = () => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/satellite-streets-v11',
  //     center: polygons.length ? polygons[0].center : defaultCenterMap,
  //     zoom: zoom,
  //     accessToken: mapBoxAccessToken,
  //   });
  //   map.current.on('load', function () {
  //     setInitialised(true);
  //     displayPolygons(map.current, mapBounds, polygons, () => {})
  //   })
  //
  // }

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