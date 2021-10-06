import React, { useEffect, useRef, useState } from 'react'

import {useSelector} from 'react-redux';

import {cropMapYears} from '../../config'
import {getPageHeight} from '../../utils/utils'
import {initialiseMap} from './base'
import CropMapCard from './CropMapCard'
import {displayCropLayer2} from './crops'

const userSubscriptionSelector = (state) => state.auth.user.tariff

const CropMap = () => {

  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapHeight, setMapHeight] = useState(550)
  const tariff = useSelector(userSubscriptionSelector)
  const [year, setYear] = useState(tariff === "free" ? 2018 : 2019)
  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)


  useEffect(() => {
    const contentHeight = getPageHeight()
    if (contentHeight > 200) {
      setMapHeight(contentHeight)
    }

    initialiseMap(mapContainer.current, map);
    map.current.on('load', function () {
      map.current.setCenter([-93.3977, 41.9780])
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
    if (initialised) {
      displayCropLayer2(map.current, year, setInfo)
    }
  }, [map, initialised, year])


  return (
      <div ref={mapContainer} className="map-container map-box-container" style={{ height: `${mapHeight}px` }}>
        <CropMapCard years={cropMapYears} year={year} setYear={setYear} info={info} />
      </div>
  )

}

export default CropMap