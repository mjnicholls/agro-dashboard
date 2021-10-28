import React, { useEffect, useRef } from 'react'

import { coverage } from '../../utils/coverage'
import { initialiseMap, basicColor, basicOpacity } from './base'

const COVERAGE_LAYER_ID = 'COVERAGE_LAYER'
const COVERAGE_LAYER_OUTLINE_ID = 'COVERAGE_LAYER_OUTLINE'

const Map = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)

  const displayCoverage = () => {
    map.current.setZoom(1)

    if (!map.current.getSource(COVERAGE_LAYER_ID)) {
      map.current.addSource(COVERAGE_LAYER_ID, {
        type: 'geojson',
        data: coverage,
      })
    }
    if (!map.current.getLayer(COVERAGE_LAYER_ID)) {
      map.current.addLayer({
        id: COVERAGE_LAYER_ID,
        type: 'fill',
        source: COVERAGE_LAYER_ID,
        paint: {
          'fill-color': basicColor,
          'fill-opacity': basicOpacity,
        },
      })
    }
    if (!map.current.getLayer(COVERAGE_LAYER_OUTLINE_ID)) {
      map.current.addLayer({
        id: COVERAGE_LAYER_OUTLINE_ID,
        type: 'line',
        source: COVERAGE_LAYER_ID,
        layout: {},
        paint: {
          'line-color': basicColor,
          'line-width': 2,
        },
      })
    }
  }

  useEffect(() => {
    initialiseMap(mapContainer.current, map, { zoom: 1 }, displayCoverage)
  }, [])

  return (
    <div ref={mapContainer} className="map-container map-box-container"></div>
  )
}

export default Map
