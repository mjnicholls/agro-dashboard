import React, { useEffect, useRef, useState } from 'react'

import { getMapHeight } from '../utils/utils'
import CropMapCard from './cropmap/CropMapCard'
import { initialiseMap } from './maps/base'
import { displayCropLayerCropMap } from './maps/crops'

const CropMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [activeYear, setActiveYear] = useState({ year: null })

  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    initialiseMap(
      mapContainer.current,
      map,
      {
        bounds: [
          [-93.39, 41.5],
          [-93.35, 41.6],
        ],
      },
      () => setInitialised(true),
    )

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (initialised && activeYear.status === 3) {
      displayCropLayerCropMap(map.current, activeYear.year, setInfo)
    }
  }, [map, initialised, activeYear])

  useEffect(() => {
    setInfo(null)
  }, [activeYear])

  return (
    <div
      ref={mapContainer}
      className="map-container map-box-container"
      style={{ height: getMapHeight() }}
    >
      <CropMapCard
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        info={info}
      />
    </div>
  )
}

export default CropMap
