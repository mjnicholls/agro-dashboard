import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import {  UncontrolledAlert } from 'reactstrap'
import { cropMapYears } from '../config'
import { getPageHeight } from '../utils/utils'
import CropMapCard from './agro-components/CropMapCard'
import { initialiseMap } from './maps/base'
import { displayCropLayer2 } from './maps/crops'

const authSelector = (state) => state.auth

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
  const auth = useSelector(authSelector)
  const isConfirmed = auth.user.isEmailConfirmed

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
    <>
    {isConfirmed === false ? (
      <UncontrolledAlert
        className="alert-with-icon"
        color="danger"
        fade={false}
      >
        <span data-notify="icon" className="tim-icons icon-bell-55" />
        <span data-notify="message">
        You have to verify your email to use Agro services. Please <a href="" target="_blank">click here</a> to get an email with the confirmation link.
        </span>
      </UncontrolledAlert>
    ) : <p></p> }
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
    </>
  )
}

export default CropMap
