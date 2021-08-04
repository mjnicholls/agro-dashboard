import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {capitalize, convertTemp, getPreticipationInfo} from "../../utils/utils";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import OWMWeatherIcon from "../owm-icons";
import {fetchOneCall} from "../../features/onecall/actions";

const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const WeatherCurrent = ({selectedPolygon}) => {

  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);
  const dispatch = useDispatch();

  let alerts = [
    {
    "sender_name": "Latvian Environment, Geology and Meteorology Centre",
    "event": "Orange Forest-Fire Warning",
    "start": 1627452000,
    "end": 1627768740,
    "description": "In the time period till 31.07.2021 in some places in western regions and east part of Latvia high risk of forest fires is expected, but in north part of Vidzeme very high risk of forest fires is expected. BE AWARE that there is a risk of forest and bush fires. Be cautious near forest and bush areas. Do not start any open fires, do not discard cigarettes! In a case of a fire accident immediately must be reported to the fire and rescue service",
    "tags": [
    "Fire warning"
    ]
    },
    {
    "sender_name": "Latvian Environment, Geology and Meteorology Centre",
    "event": "Yellow Forest-Fire Warning",
    "start": 1627452000,
    "end": 1627768740,
    "description": "In the time period till 31.07.2021 in some places in western regions and east part of Latvia high risk of forest fires is expected, but in north part of Vidzeme very high risk of forest fires is expected. BE AWARE that there is a risk of forest and bush fires. Be cautious near forest and bush areas. Do not start any open fires, do not discard cigarettes! In a case of a fire accident immediately must be reported to the fire and rescue service",
    "tags": [
    "Fire warning"
    ]
    }
  ]
  const [precipitation, setPrecipitation] = useState('');

  useEffect(() => {
    if (onecall.data) {
      if (onecall.data.minutely) {
      setPrecipitation(getPreticipationInfo(onecall.data.minutely));
    } else if (onecall.data.current) {
      setPrecipitation(onecall.data.current.rain && onecall.data.current.rain['1h'] ?
          'Precipitation: ' + onecall.data.current.rain['1h'] + 'mm/h' : 'No precipitation');
    }
    }
  }, [onecall.data])

  useEffect(() => {
    if (selectedPolygon) {
      dispatch(fetchOneCall(selectedPolygon.center[1], selectedPolygon.center[0]))
    }

  }, [selectedPolygon])

  return (
    <Card className="card-stats">
      <CardHeader>
        <Row>
          <Col className="text-left">
            <h5 className="card-category">Current</h5>
            <CardTitle tag="h2">Weather</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      {onecall.data ? <CardBody>
        <Row>
          <Col xs="5">
            <OWMWeatherIcon src={onecall.data.current.weather[0].icon} />
          </Col>
          <Col xs="7">
            <div className="numbers">
              <p className="card-category">{capitalize(onecall.data.current.weather[0].description)}</p>
              <CardTitle tag="h3">{convertTemp(onecall.data.current.temp, isMetric)}°</CardTitle>
            </div>
          </Col>
        </Row>
        <div className="stats">
          {precipitation}
        </div>
        <div className="stats">
          <i className="tim-icons icon-alert-circle-exc" /> Weather alert
        </div>
        {/*{(alerts && alerts.length) ?*/}
            {/*alerts.map((alert, index) =>*/}
              {/*<div key={'alert_' + index}>*/}
                {/*<p><i className="tim-icons icon-alert-circle-exc" style={{marginRight: "10px"}} />{capitalize(alert.event)}</p>*/}
                {/*<span>{formatDateTime(alert.start)} - {formatDateTime(alert.end)}</span>*/}
                {/*<p className="stats">{alert.description}</p>*/}
                {/*<span>{alert.sender_name}</span>*/}
                {/*<hr />*/}
              {/*</div>*/}
            {/*) : <div>No alerts</div> }*/}
        <hr />
      </CardBody> : onecall.isLoading ? <div>Fetching</div> : onecall.error ? <div>{onecall.error}</div> : null}
    </Card>
  )
}

export default WeatherCurrent;