import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'reactstrap'

import { cropMapYears, tariffError } from '../../config'
import { getPageHeight } from '../../utils/utils'
import { initialiseMap } from './base'
import CropMapCard from './CropMapCard'
import { displayCropLayer2 } from './crops'

const CropMap = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapHeight, setMapHeight] = useState(550)
  const [activeYear, setActiveYear] = useState(
    cropMapYears.find((year) => year.status === 3),
  )
  const [initialised, setInitialised] = useState(false)
  const [info, setInfo] = useState(null)

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
      {activeYear.status < 3 && (
        <Card
          className="map-placeholder d-flex justify-content-center align-items-center rounded-0 position-absolute"
          style={{ height: `${mapHeight}px` }}
        >
          <div className="text-center" style={{ maxWidth: '340px' }}>
            <h4>
              {activeYear.status === 1
                ? tariffError
                : `If you'd like to request data for the year ${activeYear.year}, please contact our sales department`}
            </h4>
            <a
              role="button"
              href={
                activeYear.status === 1
                  ? 'https://home.agromonitoring.com/subscriptions'
                  : 'mailto:info@openweathermap.org'
              }
              className="btn btn-primary"
            >
              {activeYear.status === 1 ? 'Subscription plans' : 'Contact'}
            </a>
          </div>
        </Card>
      )}
      <CropMapCard
        years={cropMapYears}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        info={info}
      />
    </div>
  )
}

export default CropMap
