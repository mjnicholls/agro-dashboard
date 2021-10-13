import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PropagateLoader } from 'react-spinners'
import { Col, Row, UncontrolledAlert } from 'reactstrap'

import { setApiKeyStatus } from '../features/auth/actions'
import { fetchPolygons } from '../features/polygons/actions'
import { apiKeyStatus } from '../services/api'
import { axiosInstance } from '../services/base'
import { getPageHeight } from '../utils/utils'
import MapBoxDraw from './maps/MapBoxDraw'
import PolygonCreateCard from './small-cards/PolygonCreateCard'

const selectIsApiKeyValid = (state) => state.auth.isApiKeyValid
const selectPolygons = (state) => state.polygons
const authSelector = (state) => state.auth

const PolygonNew = () => {
  /** Draw a new polygon, give it a name */

  const isApiKeyValid = useSelector(selectIsApiKeyValid)
  const polygons = useSelector(selectPolygons)
  const dispatch = useDispatch()
  const [geoJson, setGeoJson] = React.useState(null)
  const [area, setArea] = React.useState('')
  const [intersection, setIntersection] = React.useState(false)
  const [mode, setMode] = React.useState('draw')
  const [mapHeight, setMapHeight] = useState(550)
  const drawRef = React.useRef(null)
  const auth = useSelector(authSelector)
  const isConfirmed = auth.user.isEmailConfirmed

  useEffect(() => {
    const contentHeight = getPageHeight()
    if (contentHeight > 200) {
      setMapHeight(contentHeight)
    }
  }, [])

  useEffect(() => {
    if (!polygons.length) {
      dispatch(fetchPolygons())
    }
  }, [polygons])

  const checkAPIKeyStatus = () => {
    axiosInstance
      .get(apiKeyStatus)
      .then(() => {
        dispatch(setApiKeyStatus(true))
      })
      .catch(() => {
        dispatch(setApiKeyStatus(false))
        setTimeout(checkAPIKeyStatus, 20000)
      })
  }

  useEffect(() => {
    if (isApiKeyValid === null) {
      checkAPIKeyStatus()
    }
  }, [isApiKeyValid])

  const resetMap = () => {
    const data = drawRef.current.getAll()
    data.features.forEach((f) => {
      if (f.geometry.type === 'Polygon') {
        drawRef.current.delete(f.id)
      }
    })
    setArea(null)
    setGeoJson(null)
  }

  const blockResetMap = () =>
    !drawRef.current || !drawRef.current.getAll().features.length

  return isApiKeyValid ? (
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
        <Col md="8">
          <MapBoxDraw
            setArea={setArea}
            setGeoJson={setGeoJson}
            setIntersection={setIntersection}
            drawRef={drawRef}
            mode={mode}
            setMode={setMode}
            mapHeight={mapHeight}
          />
        </Col>
        <Col md="4">
          <PolygonCreateCard
            area={area}
            geoJson={geoJson}
            intersections={intersection}
            mode={mode}
            setMode={setMode}
            resetMap={resetMap}
            blockResetMap={blockResetMap}
            mapHeight={mapHeight}
          />
        </Col>
      </Row>
    </>
  ) : (
    <Row>
      <Col className="text-center my-5 align-self-center">
        <div className="my-5">
          <div>
            <PropagateLoader color="#f2f2f2" size={15} />
            <br />
          </div>
          <p className="my-3">
            Synchronizing API key... It might take a few minutes
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default PolygonNew
