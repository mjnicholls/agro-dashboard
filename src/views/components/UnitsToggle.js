import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { CustomInput } from 'reactstrap'

import { setUnits } from '../../features/units/actions'

const selectUnits = (state) => state.units.isMetric

const UnitsToggle = () => {
  const isMetric = useSelector(selectUnits)
  const dispatch = useDispatch()

  return (
    <CustomInput
      type="switch"
      id="units-switch"
      className="agro-switch"
      label={isMetric ? 'Metric (°C, m/s)' : 'Imperial (°F, mph)'}
      // label={isMetric ? '°C, m/s' : '°F, mph'}
      defaultChecked={isMetric}
      onClick={() => {
        dispatch(setUnits(!isMetric))
      }}
    />
  )
}

export default UnitsToggle
