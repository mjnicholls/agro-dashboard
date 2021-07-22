import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import { useSelector } from 'react-redux';

import {
  Button,
  ButtonGroup,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import SatellitePage from "./SatellitePage";
import WeatherPage from "./WeatherPage";
import {userLevels} from "../config";
import {getDateInPast} from "../utils/dateTime";

const tariffSelector = state => state.auth.user.tariff;

const PolygonInfo = ({selectedPolygon}) => {

  const [isSatellitePage, setIsSatellitePage] = useState(false);

  const tariff = useSelector(tariffSelector);
  const userLevel = userLevels[tariff];

  return (
    <>
      <Row>
        <Col sm="6">
          <CardTitle tag="h2">{selectedPolygon.name}, {selectedPolygon.area.toFixed(2)}ha</CardTitle>
        </Col>
        <Col sm="6">
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
                  active: isSatellitePage,
                })}
                onClick={() => setIsSatellitePage(true)}
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
                  active: !isSatellitePage,
                })}
                onClick={() => setIsSatellitePage(false)}
              >
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                  Weather
                </span>
                <span className="d-block d-sm-none">
                  <i className="tim-icons icon-gift-2" />
                </span>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      {isSatellitePage ?
        <SatellitePage
          selectedPolygon={selectedPolygon}
          userLevel={userLevel}
        /> : <WeatherPage
          polygon={selectedPolygon}
        /> }
      </>)

}

export default PolygonInfo;
