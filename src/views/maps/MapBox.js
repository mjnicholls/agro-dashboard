import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getMapBounds } from '../../features/polygons/selectors'
import { setActivePoly } from '../../features/state/actions'
import SatelliteImagesList from '../agro-components/SatelliteImagesList'
import {
  clusterPadding,
  initialiseMap,
  removeSatelliteLayer,
  renderSatelliteImage,
  addBoundsControl,
  polygonPadding,
} from './base'
import { displayClusters } from './clusters'
import { displayPolygonGroup } from './polygons'

const selectToken = (state) => state.auth.token
const selectPolygons = (state) => state.polygons
const selectActivePoly = (state) => state.state.polygon
const selectIsSatelliteMode = (state) => state.state.isSatelliteMode

const MapBox = ({
  satelliteImage,
  setSatelliteImage,
  satelliteLayer,
  isSatellitePage,
  setPolygonInFocus,
}) => {
  const activePolygon = useSelector(selectActivePoly)
  const polygons = useSelector(selectPolygons)
  const mapBounds = useSelector(getMapBounds)
  const token = useSelector(selectToken)
  const mapContainer = useRef(null)
  const map = useRef(null)

  const [tile, setTile] = useState(null)
  const [initialised, setInitialised] = useState(false)
  const isSatelliteMode = useSelector(selectIsSatelliteMode)
  const dispatch = useDispatch()

  const onClickPolygon = (poly) => {
    dispatch(setActivePoly(poly))
  }

  useEffect(() => {
    if (!initialised) {
      // first initialisation of the map
      initialiseMap(mapContainer.current, map, token)
      addBoundsControl(map, mapBounds)

      map.current.on('load', () => {
        if (polygons.length) {
          displayPolygonGroup(
            map.current,
            mapBounds,
            polygons,
            setPolygonInFocus,
            onClickPolygon,
          )
          displayClusters(map.current, polygons, setPolygonInFocus)
        }
        setInitialised(true)
      })
    } else {
      // new polygon has been added or removed
      displayPolygonGroup(
        map.current,
        mapBounds,
        polygons,
        setPolygonInFocus,
        onClickPolygon,
      )
      displayClusters(map.current, polygons, setPolygonInFocus)
    }
  }, [initialised, polygons, mapBounds])

  useEffect(
    () => () => {
      if (map.current) {
        setInitialised(false)
        map.current.remove()
      }
    },
    [],
  )

  useEffect(() => {
    if (isSatelliteMode) {
      if (satelliteImage) {
        setTile(satelliteImage.tile[satelliteLayer])
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
        map.current.fitBounds(activePolygon.bbox, polygonPadding)
      } else if (polygons.length) {
        if (polygons.length > 1) {
          map.current.fitBounds(mapBounds, clusterPadding)
        } else {
          map.current.setCenter(polygons[0].center)
          map.current.setZoom(12)
        }
        setTile(null)
      }
    }
  }, [initialised, activePolygon, mapBounds, polygons])

  return (
    <div className="mb-5">
      <div ref={mapContainer} className="map-container map-box-container">
        {activePolygon && (
          <SatelliteImagesList
            satelliteImage={satelliteImage}
            setSatelliteImage={setSatelliteImage}
            isSatellitePage={isSatellitePage}
          />
        )}
      </div>
    </div>
  )
}

export default MapBox
