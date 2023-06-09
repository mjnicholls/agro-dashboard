import React from 'react'

import {
  faListUl,
  faSatellite,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'reactstrap'

import { setActivePoly, setSatelliteMode } from '../../features/state/actions'

const selectPolygons = (state) => state.polygons.data
const selectActivePoly = (state) => state.state.polygon
const selectIsSatelliteMode = (state) => state.state.isSatelliteMode

const ToggleModes = () => {
  const dispatch = useDispatch()
  const polygons = useSelector(selectPolygons)
  const activePoly = useSelector(selectActivePoly)
  const isSatelliteMode = useSelector(selectIsSatelliteMode)

  const selectAllPolygons = () => {
    if (activePoly) {
      dispatch(setActivePoly(null))
      dispatch(setSatelliteMode(true))
    }
  }

  const selectSatellite = () => {
    if (activePoly) {
      dispatch(setSatelliteMode(true))
    } else {
      dispatch(setActivePoly(polygons[0]))
      dispatch(setSatelliteMode(true))
    }
  }

  const selectWeather = () => {
    if (activePoly) {
      dispatch(setSatelliteMode(false))
    } else {
      dispatch(setActivePoly(polygons[0]))
      setSatelliteMode(false)
    }
  }

  return (
    <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
      <Button
        color="github"
        id="0"
        size="sm"
        tag="label"
        className={classNames('btn-simple', {
          active: !activePoly,
        })}
        style={{ padding: '5px 10px' }}
        onClick={selectAllPolygons}
      >
        <span>
          <FontAwesomeIcon icon={faListUl} />
        </span>
      </Button>
      <Button
        color="github"
        id="1"
        size="sm"
        tag="label"
        className={classNames('btn-simple', {
          active: activePoly && isSatelliteMode,
        })}
        style={{ padding: '5px 10px' }}
        onClick={selectSatellite}
      >
        <span>
          <FontAwesomeIcon icon={faSatellite} />
        </span>
      </Button>
      <Button
        color="github"
        id="2"
        size="sm"
        tag="label"
        className={classNames('btn-simple', {
          active: activePoly && !isSatelliteMode,
        })}
        style={{ padding: '5px 10px' }}
        onClick={selectWeather}
      >
        <span>
          <FontAwesomeIcon icon={faTemperatureLow} />
        </span>
      </Button>
    </ButtonGroup>
  )
}

export default ToggleModes
