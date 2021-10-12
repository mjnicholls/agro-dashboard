import React, { useEffect, useRef, useState } from 'react'

import { cropMapYears } from '../config'
import { getPageHeight } from '../utils/utils'
import CropMapCard from './agro-components/CropMapCard'
import { initialiseMap } from './maps/base'
import { displayCropLayer2 } from './maps/crops'

const CropMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapHeight, setMapHeight] = useState(550)
  const [activeYear, setActiveYear] = useState(
    cropMapYears.find((year) => year.status === 3),
  )
  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const contentHeight = getPageHeight()
    if (contentHeight > 200) {
      setMapHeight(contentHeight)
    }

    initialiseMap(mapContainer.current, map)
    map.current.on('load', () => {
      map.current.setCenter([-93.3977, 41.978])
      map.current.setZoom(12)
      setInitialised(true)
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (initialised && activeYear.status === 3) {
      displayCropLayer2(map.current, activeYear.year, setInfo)
    }
  }, [map, initialised, activeYear])

  return (
    <div
      ref={mapContainer}
      className="map-container map-box-container"
      style={{ height: `${mapHeight}px` }}
    >
      {alert}
      <CropMapCard
        years={cropMapYears}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        setAlert={setAlert}
        info={info}
      />
    </div>
  )
}

export default CropMap
