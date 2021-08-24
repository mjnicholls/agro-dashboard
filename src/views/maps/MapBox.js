import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  activeColor, activeOpacity, basicColor, clusterPadding,
  initialiseMap,
  removeSatelliteLayer,
  renderSatelliteImage, basicBlueColor, basicOpacity, polygonPadding,
} from './base';
import {displayClusters} from './clusters';
import {displayPolygonGroup} from './polygons';
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
  }, [polygons, mapBounds]);

  useEffect(() => {
    return () => {
      if (map.current) {
        setInitialised(false);
        map.current.remove();
      }
    }
  }, []);

  useEffect(() => {
    if (isSatelliteMode) {
      if (satelliteImage) {
        setTile(satelliteImage.tile[satelliteLayer.value])
      }
    } else {
      setTile(null)
    }
  }, [isSatelliteMode, satelliteImage, satelliteLayer])

  useEffect(() => {
    if (tile) {
      renderSatelliteImage(map.current, tile)
    } else {
      removeSatelliteLayer(map.current)
    }
  }, [tile])

  useEffect(() => {
    /** On polygon select: zoom to the polygon, apply satellite image, apply layer */
    if (initialised) {
      if (activePolygon) {
        console.log("activePolygon", activePolygon)
        map.current.fitBounds(activePolygon.bbox, polygonPadding);
      } else {
        if (mapBounds) {
          map.current.fitBounds(mapBounds, clusterPadding)
        }
        setTile(null);
      }
    }
  }, [initialised, activePolygon, mapBounds])

 return (
  <div className="mb-5">
    <div ref={mapContainer} className="map-container map-box-container" >
    {(activePolygon) &&
      <SatelliteImagesList
        satelliteImage={satelliteImage}
        setSatelliteImage={setSatelliteImage}
        isSatellitePage={isSatellitePage}
      />}
    </div>
  </div>
);
}

export default MapBox;