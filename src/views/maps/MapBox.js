import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  activeColor, activeOpacity, displayClusters, basicColor, clusterPadding, displayPolygons,
  initialiseMap,
  removeSatelliteLayer,
  renderSatelliteImage, basicBlueColor, basicOpacity, polygonPadding, displayPolygonGroup
} from './base';
import {getMapBounds} from '../../features/polygons/selectors'
import SatelliteImagesList from "../agro-components/SatelliteImagesList";
import {setActivePoly} from "../../features/state/actions";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const MapBox = ({ satelliteImage, setSatelliteImage, satelliteLayer, isSatellitePage, setPolygonInFocus }) => {

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const mapBounds = useSelector(getMapBounds);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [tile, setTile] = useState(null);
  const [initialised, setInitialised] = useState(false);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);
  const dispatch = useDispatch();

  const onClickPolygon = (poly) => {
    console.log("onClickPolygon", onClickPolygon)
    dispatch(setActivePoly(poly))
  }

  useEffect(() => {
    if (!initialised) {
      // first initialisation of the map
      initialiseMap(mapContainer.current, map, mapBounds, () => {setInitialised(true)}, setPolygonInFocus, onClickPolygon)
    } else {
      // new polygon has been added or removed
      displayPolygonGroup(map.current, mapBounds, polygons, setPolygonInFocus, onClickPolygon);
      displayClusters(map.current, polygons);

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
    /** On polygon select:
     * zoom to the polygon
     * apply satellite image
     * apply layer
     */
    if (initialised) {
      if (activePolygon) {
        map.current.fitBounds(activePolygon.bbox, polygonPadding);
        for (let i=0; i<polygons.length; i++) {
          map.current.setPaintProperty("layer_" + polygons[i].id, "fill-opacity", polygons[i].id === activePolygon.id ? activeOpacity : basicOpacity)
          map.current.setPaintProperty("layer_" + polygons[i].id, 'fill-color',
            polygons[i].id === "layer_" + activePolygon.id ? basicBlueColor : basicColor);
        }
      } else {
        if (mapBounds) {
          map.current.fitBounds(mapBounds, clusterPadding)
        }
      }
    }
  }, [initialised, activePolygon, mapBounds])

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