import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";

import OWMWeatherIcon from "../owm-icons";
import {fetchOneCall} from "../../features/onecall/actions";
import ChartContainer from "../charts/ui/ChartContainer";
import {formatDateTime} from "../../utils/dateTime";
import {capitalize, convertTemp, getPreticipationInfo} from "../../utils/utils";


const selectActivePoly = state => state.state.polygon;
const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const WeatherCurrent = () => {

  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);
  const dispatch = useDispatch();
  const activePolygon = useSelector(selectActivePoly);
  const [alert, setAlert] = useState(null);

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

   const htmlAlert = (alerts) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title="Weather alerts"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        showConfirm={false}
      >
        <div>
        {(alerts && alerts.length) ?
            alerts.map(alert =>
              <>
                <p><b>{capitalize(alert.event)}</b></p>
                <p><small>{formatDateTime(alert.start)} - {formatDateTime(alert.end)}</small></p>
                <p>{alert.description}</p>
                <p><small>{alert.sender_name}</small></p>
                <hr />
              </>
            ) : "No alerts"}
        </div>

      </ReactBSAlert>
    );
  };

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
    if (activePolygon) {
      dispatch(fetchOneCall(activePolygon.center[1], activePolygon.center[0]))
    }
  }, [activePolygon])

  return (
    <>
      {alert}
      <Card className="card-stats">
        <CardHeader>
          <Row>
            <Col className="text-left" xs={(onecall.data && onecall.data.alerts) ? 9 : 12}>
              <h5 className="card-category mb-0">Current</h5>
              <CardTitle tag="h2" className="mb-0">Weather</CardTitle>
            </Col>
            {(onecall.data && onecall.data.alerts) && <Col xs="3" className="text-right">
              <Button
                className="btn-simple btn-round btn-icon agro-notification-icon"
                onClick={(e) => {
                  htmlAlert(onecall.data.alerts);
                  e.stopPropagation();
                }}
              ><i className="fas fa-exclamation" /></Button>
            </Col>}
          </Row>
        </CardHeader>
        <CardBody>
          <ChartContainer
            isLoading={onecall.isLoading}
            error={onecall.error}
            style={{height: "70px"}}
          >
            { onecall.data ?
             <>
              <Row className="mb-2">
              <Col xs="4">
                <OWMWeatherIcon src={onecall.data.current.weather[0].icon} />
              </Col>
              <Col xs="8">
                <div className="numbers">
                  <CardTitle tag="h3" className="mb-0">{convertTemp(onecall.data.current.temp, isMetric)}°</CardTitle>
                  <p className="card-category mt-0">{capitalize(onecall.data.current.weather[0].description)}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col><p className="my-0">{precipitation}</p></Col>
            </Row>
             </> : null
            }
          </ChartContainer>
          {/*<div className="stats">*/}
            {/*<i className="tim-icons icon-alert-circle-exc" /> Weather alert*/}
          {/*</div>*/}
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
          {/*<hr />*/}
        </CardBody>
      </Card>
    </>
  )
}

export default WeatherCurrent;