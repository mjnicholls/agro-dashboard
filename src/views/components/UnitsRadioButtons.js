import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { setUnits } from '../../features/units/actions'

const selectUnits = (state) => state.units.isMetric

const UnitsToggle = () => {
  const isMetric = useSelector(selectUnits)
  const dispatch = useDispatch()

  return (
    <Form>
      <p>Units of measurement:</p>
      <FormGroup check className="form-check-radio ml-5">
        <Row>
          <Col>
            <Label check className="mr-3">
              <Input
                id="metric"
                name="units"
                type="radio"
                checked={isMetric}
                onChange={() => dispatch(setUnits(!isMetric))}
              />
              <span className="form-check-sign" />
              Metric (°C, m/s)
            </Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Label check>
              <Input
                id="imperial"
                name="units"
                type="radio"
                checked={!isMetric}
                onChange={() => dispatch(setUnits(!isMetric))}
              />
              <span className="form-check-sign" />
              Imperial (°F, mph)
            </Label>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  )
}

export default UnitsToggle
