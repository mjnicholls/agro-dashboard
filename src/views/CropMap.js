import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { getPageHeight } from '../utils/utils'
import CropMapCard from './agro-components/CropMapCard'
import { initialiseMap } from './maps/base'
import { displayCropLayer2 } from './maps/crops'

const selectYears = (state) => state.auth.limits.maps.crop

const CropMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapHeight, setMapHeight] = useState(550)
  const years = useSelector(selectYears)
  const [activeYear, setActiveYear] = useState(
    years.find((year) => year.status === 3),
  )
  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const contentHeight = getPageHeight()
    if (contentHeight > 200) {
      setMapHeight(contentHeight)
    }

    initialiseMap(mapContainer.current, map, {bounds: [[-93.39, 41.5], [-93.35, 41.6]]}, () => setInitialised(true))

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
        years={years}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        setAlert={setAlert}
        info={info}
      />
    </div>
  )
}

export default CropMap
