import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {capitalize, convertTemp, getPreticipationInfo} from "../../utils/utils";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table
} from "reactstrap";
import OWMWeatherIcon from "../owm-icons";
import {fetchOneCall} from "../../features/onecall/actions";
import {getCurrentSoil} from "../../services/api/weatherApi";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {formatDateTime} from "../../utils/dateTime";


const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const CombinedWeatherSoilCurrent = ({selectedPolygon}) => {

  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);
  const dispatch = useDispatch();
  const [precipitation, setPrecipitation] = useState('');
  const [alert, setAlert] = React.useState(null);

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title="Weather alerts"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        showConfirm={false}
      >
        <div>
        {(onecall.data.alerts && onecall.data.alerts.length) ?
            onecall.data.alerts.map(alert =>
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
    if (selectedPolygon) {
      dispatch(fetchOneCall(selectedPolygon.center[1], selectedPolygon.center[0]))
      getCurrentSoil(selectedPolygon.id)
        .then(res => {
          setData(res)
        })
        .catch((err) => {
          if (typeof err === "object") {
            err = err.message || "Something went wrong";
          }
          setError(err);
        })
        .finally(() => {setIsLoading(false)})
    }

  }, [selectedPolygon])

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {alert}
      <Card className="small-card">
       <CardHeader>
        <Row>
          <Col className="text-left">
            <h5 className="card-category mb-0">Current</h5>
            <CardTitle tag="h2" className="mb-0">Weather</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="pt-0">
        {onecall.data ?
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

          <Row>
            <Col>
          {(onecall.data.alerts && onecall.data.alerts.length) ? <Button
            color="github" id="weather-alert" size="sm" tag="label"
            className={"btn-simple"}
            onClick={(e) => {
              htmlAlert();
              e.stopPropagation();
            }}
            style={{padding: "5px 10px"}}
          >
            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
              {`${onecall.data.alerts[0].event}${onecall.data.alerts.length > 1 ? onecall.data.alerts.length - 1 : ""}`}
            </span>
            <span className="d-block d-sm-none">
              <i className="tim-icons icon-alert-circle-exc" />
            </span>
          </Button> : <div>
            <i className="tim-icons icon-alert-circle-exc" /> No weather alerts
          </div>}
            </Col>
          </Row>


        </> : onecall.isLoading ? <div>Fetching</div> : onecall.error ? <div>{onecall.error}</div> : null}
      </CardBody>
        <CardHeader>
        <Row>
          <Col className="text-left">
            <h5 className="card-category mb-0">Current</h5>
            <CardTitle tag="h2" className="mb-0" >Soil data</CardTitle>
          </Col>
        </Row>
      </CardHeader>
        <CardBody className="pt-0">
        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> :
          error ?
            <div className="chart-placeholder">{error}</div>  :
            <Table>
              <tbody>
                <tr>
                  <td>Temperature at the surface</td>
                  <td><CardTitle tag="h3" className="text-right">{convertTemp(data.t0, isMetric)}°</CardTitle></td>
                </tr>
                <tr>
                  <td>Temperature at the depth of 10cm</td>
                  <td><CardTitle tag="h3" className="text-right">{convertTemp(data.t10, isMetric)}°</CardTitle></td>
                </tr>
                <tr>
                  <td>Soil moisture</td>
                  <td><CardTitle tag="h3" className="text-right">{Math.round(data.moisture * 100)}%</CardTitle></td>
                </tr>
              </tbody>
            </Table>
          }
        </CardBody>
      </Card>
    </>
  )
}

export default CombinedWeatherSoilCurrent;