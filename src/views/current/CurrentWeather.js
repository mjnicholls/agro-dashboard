import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {capitalize, convertTemp, getPreticipationInfo} from "../../utils/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import OWMWeatherIcon from "../owm-icons/index";

const selectUnits = state => state.units.isMetric;

const CurrentWeather = ({ isLoading, error, current, minutely }) => {

  const isMetric = useSelector(selectUnits);
  const [precipitation, setPrecipitation] = useState('');

  useEffect(() => {
    if (minutely) {
      setPrecipitation(getPreticipationInfo(minutely));
    } else if (current) {
      setPrecipitation(current.rain && current.rain['1h'] ?
          'Precipitation: ' + current.rain['1h'] + 'mm/h' : 'No precipitation');
    }
  }, [minutely])

  return (
    <Card className="card-stats">
      <CardHeader>
        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Current</h5>
            <CardTitle tag="h2">Weather</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      {isLoading ?
        <CardBody>
          <div className="chart-placeholder">Fetching data...</div>
        </CardBody> : error ?
        <CardBody>
          <div className="chart-placeholder">{error}</div>
        </CardBody> :
          <>
            <CardBody>
              <Row>
                <Col xs="5">

                  <OWMWeatherIcon src={current.weather[0].icon} />

                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">{capitalize(current.weather[0].description)}</p>
                    <CardTitle tag="h3">{convertTemp(current.temp, isMetric)}°</CardTitle>
                  </div>
                </Col>
              </Row>
              {/*<br />*/}
              {/*<Row>*/}
                {/*<Col>{current.precipitation}</Col>*/}
              {/*</Row>*/}
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                {precipitation}
              </div>
              {/*<div className="stats">*/}
                {/*<i className="tim-icons icon-alert-circle-exc" /> Weather alert*/}
              {/*</div>*/}
            </CardFooter>
          </>}
    </Card>
  )
}


export default CurrentWeather;