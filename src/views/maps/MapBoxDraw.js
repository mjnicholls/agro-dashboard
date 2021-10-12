import React, { useEffect, useRef, useState } from 'react'

import MapboxDraw from '@mapbox/mapbox-gl-draw'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import * as turf from '@turf/turf'
import { useSelector } from 'react-redux'

import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-unresolved
import { getMapBounds } from '../../features/polygons/selectors'
import { axiosInstance } from '../../services/base'
import { addBoundsControl, deletePreviousAreas, initialiseMap } from './base'
import { displayClusters } from './clusters'
import { removeCropLayer, displayCropLayer } from './crops'
import { displayPolygonGroup } from './polygons'

const selectPolygons = (state) => state.polygons
const selectToken = (state) => state.auth.token

const MapBoxDraw = ({
  setArea,
  setGeoJson,
  setIntersection,
  drawRef,
  mode,
  setMode,
  mapHeight,
}) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const mapBounds = useSelector(getMapBounds)

  const [initialised, setInitialised] = useState(false)
  const polygons = useSelector(selectPolygons)
  const token = useSelector(selectToken)

  const deletePreviousAreasLocal = () => {
    deletePreviousAreas(drawRef)
    deleteArea()
  }

  useEffect(
    () => () => {
      if (map.current) {
        map.current.remove()
      }
    },
    [],
  )

  useEffect(() => {
    if (!initialised) {
      // first initialisation of the map
      initialiseMap(mapContainer.current, map, token)
      addBoundsControl(map, mapBounds)

      map.current.on('load', () => {
        if (polygons.length) {
          displayPolygonGroup(map.current, mapBounds, polygons)
          displayClusters(map.current, polygons)
        }
        setInitialised(true)
      })
    } else {
      // new polygon has been added
      displayPolygonGroup(map.current, mapBounds, polygons)
      // displayPolygons(map.current, mapBounds, polygons);
      displayClusters(map.current, polygons)
    }
  }, [initialised, polygons, mapBounds])

  useEffect(() => {
    if (initialised) {
      if (mode === 'select') {
        deletePreviousAreasLocal(drawRef)
        displayCropLayer(map.current, drawRef, setMode, updateArea)
      } else {
        removeCropLayer(map.current)
      }
    }
  }, [initialised, mode])

  useEffect(() => {
    if (initialised) {
      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          autocomplete: false,
          minLength: 3,
          externalGeocoderOnly: true,
          marker: false,
          localGeocoderOnly: true,
          localGeocoder: dummyLocalSearch,
          externalGeocoder: nominatimGeocoder,
        }),
        'top-left',
      )
      addDrawFunctionality(map.current)
    }
  }, [initialised])

  const nominatimGeocoder = (query) =>
    /** Load custom data to supplement the search results */
    axiosInstance
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`,
      )
      .then((response) => {
        const features = []
        for (let i = 0; i < response.data.length; i += 1) {
          const feature = response.data[i]
          feature.place_name = feature.display_name
          feature.center = [feature.lon, feature.lat]
          feature.place_type = feature.type
          features.push(feature)
        }
        return features
      })
      .catch(() => [])

  const dummyLocalSearch = () =>
    /** Dummy function to be able to set localGeocoderOnly to true to avoid using mapbox geocoder * */
    []

  const createArea = () => {
    deletePreviousAreas(drawRef)
    updateArea()
  }

  const updateArea = () => {
    const data = drawRef.current.getAll()
    if (data.features.length > 0) {
      const area = (turf.area(data) / 10000).toFixed(2)
      const poly = turf.polygon(data.features[0].geometry.coordinates, {
        name: 'poly1',
      })
      const intersections = turf.kinks(poly)
      setArea(area)
      setGeoJson(data.features[0])
      setIntersection(intersections.features.length > 0)
    }
  }

  const deleteArea = () => {
    setArea(null)
    setGeoJson(null)
  }

  const addDrawFunctionality = (mapInstance) => {
    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    })
    mapInstance.addControl(drawRef.current, 'top-right')
    mapInstance.on('draw.create', createArea)
    mapInstance.on('draw.update', updateArea)
    mapInstance.on('draw.delete', deleteArea)
    // map.on('draw.modechange', deletePreviousAreas);
  }

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container map-box-container mb-5"
        style={{ height: `${mapHeight}px` }}
      />
    </div>
  )
}

export default MapBoxDraw
