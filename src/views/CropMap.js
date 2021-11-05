import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { getMapHeight } from '../utils/utils'
import CropMapCard from './components/CropMapCard'
import { initialiseMap } from './maps/base'
import { displayCropLayer2 } from './maps/crops'

const selectYears = (state) => state.auth.limits.maps.crop

const CropMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const years = useSelector(selectYears)
  const [activeYear, setActiveYear] = useState(
    years.find((year) => year.status === 3),
  )
  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)
  const [alert, setAlert] = useState(null)

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
      displayCropLayer2(map.current, activeYear.year, setInfo)
    }
  }, [map, initialised, activeYear])

  return (
    <div
      ref={mapContainer}
      className="map-container map-box-container"
      style={{ height: getMapHeight() }}
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
