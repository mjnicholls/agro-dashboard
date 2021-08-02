import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import {
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import Toggler from './agro-components/Toggler';
import SatellitePage from './SatellitePage';
import WeatherPage from './WeatherPage';
import {userLevels} from '../config';

const tariffSelector = state => state.auth.user.tariff;

const PolygonInfo = ({selectedPolygon}) => {

  const [isSatellitePage, setIsSatellitePage] = useState(true);

  const tariff = useSelector(tariffSelector);
  const userLevel = userLevels[tariff];

  return (
    <>
      <Row>
        <Col sm="6">
          <CardTitle tag="h2">{selectedPolygon.name}, {selectedPolygon.area.toFixed(2)}ha</CardTitle>
        </Col>
        <Col sm="6">
          <Toggler
            isActive={isSatellitePage}
            setIsActive={setIsSatellitePage}
            labelOne="Satellite data & Statistics"
            labelTwo="Weather Data"
          />
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
