import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, UncontrolledAlert } from 'reactstrap'

import { fetchPolygons } from '../features/polygons/actions'
import { getOneCallData } from '../services/api/weatherApi'
import PolygonTable from './agro-components/PolygonTable'
import CombinedChart from './charts/CombinedChart'
import NdviChart from './charts/NdviChart'
import MapBox from './maps/MapBox'
import ImageStats from './small-cards/LayerStats'
import PolygonInfo from './small-cards/PolygonInfo'
import PolygonTableSmall from './small-cards/PolygonList'
import PolygonsTotalStats from './small-cards/PolygonsTotalStats'
import SoilCurrent from './small-cards/SoilCurrent'
import WeatherCurrent from './small-cards/WeatherCurrent'

const selectPolygons = (state) => state.polygons
const selectActivePoly = (state) => state.state.polygon
const selectIsSatelliteMode = (state) => state.state.isSatelliteMode
const authSelector = (state) => state.auth

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
  const dispatch = useDispatch()
  const activePolygon = useSelector(selectActivePoly)
  const polygons = useSelector(selectPolygons)
  const isSatelliteMode = useSelector(selectIsSatelliteMode)
  const auth = useSelector(authSelector)
  const isConfirmed = auth.user.isEmailConfirmed

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

  useEffect(() => {
    if (!polygons.length) {
      dispatch(fetchPolygons())
    }
  }, [polygons])

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
    </>
  )
}

export default Dashboard
