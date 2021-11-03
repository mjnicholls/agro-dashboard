import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'

import { getOneCallData } from '../api/weather'
import CombinedChart from './charts/CombinedChart'
import NdviChart from './charts/NdviChart'
import PolygonTable from './dashboard/PolygonTable'
import ImageStats from './dashboard/small-cards/LayerStats'
import PolygonInfo from './dashboard/small-cards/PolygonInfo'
import PolygonTableSmall from './dashboard/small-cards/PolygonList'
import PolygonsTotalStats from './dashboard/small-cards/PolygonsTotalStats'
import SoilCurrent from './dashboard/small-cards/SoilCurrent'
import WeatherCurrent from './dashboard/small-cards/WeatherCurrent'
import MapBox from './maps/MapBox'
import Synchronizing from './components/Synchronizing'

const selectPolygons = (state) => state.polygons
const selectActivePoly = (state) => state.state.polygon
const selectIsApiKeyValid = (state) => state.auth.isApiKeyValid
const selectIsSatelliteMode = (state) => state.state.isSatelliteMode

const Dashboard = () => {
  const [satelliteImage, setSatelliteImage] = useState(null)
  // const [satelliteLayer, setSatelliteLayer] = useState({value: "ndvi", label: "NDVI"});
  const [satelliteLayer, setSatelliteLayer] = useState('ndvi')
  const [polygonInFocus, setPolygonInFocus] = useState(null)
  const [weatherData, setWeatherData] = useState({
    data: null,
    isLoading: true,
    error: null,
  })
  const activePolygon = useSelector(selectActivePoly)
  const polygons = useSelector(selectPolygons)
  const isSatelliteMode = useSelector(selectIsSatelliteMode)
  const isApiKeyValid = useSelector(selectIsApiKeyValid)


  useEffect(() => {
    if (!isSatelliteMode) {
      setWeatherData({
        isLoading: true,
      })
      getOneCallData(activePolygon.center[1], activePolygon.center[0])
        .then((res) => {
          setWeatherData({
            isLoading: false,
            data: res,
          })
        })
        .catch((err) => {
          setWeatherData({
            isLoading: false,
            data: null,
            error: err,
          })
        })
    }
  }, [isSatelliteMode, activePolygon])

  const activeTopSection = () =>
    isSatelliteMode ? (
      <ImageStats
        satelliteImage={satelliteImage}
        satelliteLayer={satelliteLayer}
        setSatelliteLayer={setSatelliteLayer}
      />
    ) : (
      <>
        <WeatherCurrent onecall={weatherData} />
        <SoilCurrent polyId={activePolygon.id} />
      </>
    )

  const activeChart = () =>
    isSatelliteMode ? (
      <NdviChart polyId={activePolygon.id} />
    ) : (
      <CombinedChart polyId={activePolygon.id} onecall={weatherData} />
    )

  return (
    isApiKeyValid ? <>
      <Row>
        <Col lg="6">
          <MapBox
            // activePolygon={activePolygon}
            satelliteImage={satelliteImage}
            setSatelliteImage={setSatelliteImage}
            satelliteLayer={satelliteLayer}
            isSatellitePage={isSatelliteMode}
            setPolygonInFocus={setPolygonInFocus}
          />
        </Col>

        <Col lg="3" sm="6">
          {activePolygon ? (
            activeTopSection()
          ) : (
            <PolygonInfo polygonInFocus={polygonInFocus} />
          )}
        </Col>

        <Col lg="3" sm="6">
          {activePolygon ? (
            <PolygonTableSmall />
          ) : (
            <PolygonsTotalStats
              polygons={polygons}
              activePolygon={polygons[0]}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {activePolygon ? (
            activeChart()
          ) : (
            <PolygonTable
              data={polygons}
              // activePolygon={activePolygon}
              // setActivePolygon={setActivePolygon}
            />
          )}
        </Col>
      </Row>
    </> : <Synchronizing />
  )
}

export default Dashboard
