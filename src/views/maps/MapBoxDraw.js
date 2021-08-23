import React, {useEffect, useRef, useState} from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useSelector } from 'react-redux';
import * as turf from '@turf/turf'
import {axiosInstance} from '../../services/base'
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {deletePreviousAreas, displayClusters, displayPolygons, displayPolygonsGroup, initialiseMap} from './base';
import {cropsSourceId, removeCropLayer, displayCropLayer} from './crops';
import {getMapBounds} from '../../features/polygons/selectors'

const selectPolygons = state => state.polygons;

const MapBoxDraw = ({setArea, setGeoJson, setIntersection, drawRef, mode, setMode, mapHeight}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const mapBounds = useSelector(getMapBounds);

  const [initialised, setInitialised] = useState(false);
  const polygons = useSelector(selectPolygons);

  const deletePreviousAreasLocal = () => {
    deletePreviousAreas(drawRef);
    deleteArea();
  }

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (!initialised) {
      // first initialisation of the map
      initialiseMap(mapContainer.current, map, mapBounds, () => setInitialised(true))
    } else {
      // new polygon has been added
      displayPolygonsGroup(map.current, mapBounds, polygons);
      // displayPolygons(map.current, mapBounds, polygons);
      displayClusters(map.current, polygons);
    }
  }, [polygons, mapBounds]);

  useEffect(() => {
    if (initialised) {
      if (mode === 'select') {
        deletePreviousAreasLocal(drawRef);
        displayCropLayer(map.current, drawRef, setMode, updateArea);
        // map.current.on('click', cropsSourceId, function (e) {
        //   // получить feature id
        //   let feature = e.features[0];
        //   console.log("feature", feature)
        //   // сравнить с предыдущим слоем
        //   const data = drawRef.current.getAll();
        //   if (data.features.length) {
        //     // 2 варианта, либо тут тот же полигон - edit, либо другой - тогда его нужно удалить
        //     data.features.forEach((f) => {
        //       console.log("forEach", f.id)
        //       if (f.id !== feature.id) {
        //         // прошлый полигон - удаляем
        //         drawRef.current.delete(f.id);
        //       } else {
        //         // тот же полигон - редактируем
        //         setMode("draw")
        //       }
        //     })
        //   } else {
        //     drawRef.current.add(feature);
        //   }
        //   updateArea();
        // })
      } else {
        removeCropLayer(map.current)
      }
    }
  }, [initialised, mode])

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
        return []
      })
  }

  const dummyLocalSearch = () => {
    /** Dummy function to be able to set localGeocoderOnly to true to avoid using mapbox geocoder **/
    return [];
  }

  const createArea = () => {
    deletePreviousAreas(drawRef);
    updateArea();
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

  const deleteArea = () => {
    setArea(null);
    setGeoJson(null);
  }

  const addDrawFunctionality = (map) => {
    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true
        }
      });
    map.addControl(drawRef.current, 'top-right');
    map.on('draw.create', createArea);
    map.on('draw.update', updateArea);
    map.on('draw.delete', deleteArea);
    // map.on('draw.modechange', deletePreviousAreas);
  }

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container map-box-container mb-5"
        style={{height: mapHeight + "px"}}
      />
    </div>
  );
}

export default MapBoxDraw;