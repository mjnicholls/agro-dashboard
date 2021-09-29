import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setUnits} from '../../features/units/actions'

import {
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const selectUnits = state => state.units.isMetric;

const UnitsToggle = () => {

  const isMetric = useSelector(selectUnits);
  const dispatch = useDispatch();

  return (
    <Form>
        <Label>Units of measurement:</Label>
        <FormGroup check className="form-check-radio">
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
        </FormGroup>
      </Form>
  )
}

export default UnitsToggle;