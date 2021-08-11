import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import classNames from "classnames";

import {
  Button,
  ButtonGroup,
} from "reactstrap";
import {setSatelliteMode} from "../../features/state/actions";
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const TogglerSatelliteMode = () => {

  const isSatelliteMode = useSelector(selectIsSatelliteMode);
  const dispatch = useDispatch();

  return (<ButtonGroup
    className="btn-group-toggle float-right"
    data-toggle="buttons"
  >
    <Button
      color="info"
      id="0"
      size="sm"
      tag="label"
      className={classNames("btn-simple", {
        active: isSatelliteMode,
      })}
      onClick={() => dispatch(setSatelliteMode(true))}
    >
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        Satellite
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-single-02" />
      </span>
    </Button>
    <Button
      color="info"
      id="1"
      size="sm"
      tag="label"
      className={classNames("btn-simple", {
        active: !isSatelliteMode,
      })}
      onClick={() => dispatch(setSatelliteMode(false))}
    >
      <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
        Weather
      </span>
      <span className="d-block d-sm-none">
        <i className="tim-icons icon-gift-2" />
      </span>
    </Button>
  </ButtonGroup>)
}


export default TogglerSatelliteMode;