import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import classNames from "classnames";

import {
  Button,
  ButtonGroup,
} from "reactstrap";
import {setActivePoly} from "../../features/state/actions";

const selectPolygons = state => state.polygons;
const selectActivePoly = state => state.state.polygon;

const TogglerThree = ({activePage, setActivePage, setIsSatellitePage, labelOne, labelTwo, labelThree}) => {

  const dispatch = useDispatch();
  const polygons = useSelector(selectPolygons);
  const activePoly = useSelector(selectActivePoly);

  const selectAllPolygons = () => {
    if (activePoly) {
      dispatch(setActivePoly(null));
    }
    setActivePage("Home");
  }

  const selectSatellite = () => {
    if (activePoly) {
      setIsSatellitePage(true);
    } else {
      dispatch(setActivePoly(polygons[0]));
      // setIsSatellitePage(true)
    }
    setActivePage("Satellite");
  }

  const selectWeather = () => {
    if (activePoly) {
      setIsSatellitePage(false);
    } else {
      dispatch(setActivePoly(polygons[0]));
      setIsSatellitePage(false);
    }
    setActivePage("Weather");
  }



  return (
    <ButtonGroup
      className="btn-group-toggle float-right"
      data-toggle="buttons"
    >
      <Button
        color="info"
        id="0"
        size="sm"
        tag="label"
        className={classNames("btn-simple", {
          active: labelOne === activePage,
        })}
        onClick={selectAllPolygons}
      >
        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
          {labelOne}
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
          active: labelTwo === activePage,
        })}
        onClick={selectSatellite}
      >
        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
          {labelTwo}
        </span>
        <span className="d-block d-sm-none">
          <i className="tim-icons icon-gift-2" />
        </span>
      </Button>
      <Button
        color="info"
        id="2"
        size="sm"
        tag="label"
        className={classNames("btn-simple", {
          active: labelThree === activePage,
        })}
        onClick={selectWeather}
      >
        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
          {labelThree}
        </span>
        <span className="d-block d-sm-none">
          <i className="tim-icons icon-gift-2" />
        </span>
      </Button>
    </ButtonGroup>
)}

export default TogglerThree;