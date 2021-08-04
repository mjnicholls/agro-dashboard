import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {capitalize, convertTemp, getPreticipationInfo} from "../../utils/utils";

import {
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

const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const CombinedWeatherSoilCurrent = ({selectedPolygon}) => {

  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);
  const dispatch = useDispatch();
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
    <Card className="small-card">
      <CardHeader>
        <Row>
          <Col className="text-left">
            <h5 className="card-category">Current</h5>
            <h2 className="mb-0">Weather & Soil</h2>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {onecall.data ?
        <>
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
          <hr />
        </> : onecall.isLoading ? <div>Fetching</div> : onecall.error ? <div>{onecall.error}</div> : null}

        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> :
          error ?
            <div className="chart-placeholder">{error}</div>  :
            <Table>
              <tbody>
                <tr>
                  <td>Soil temperature at the surface</td>
                  <td>{convertTemp(data.t0, isMetric)}°</td>
                </tr>
                <tr>
                  <td>Soil temperature at the depth of 10cm</td>
                  <td>{convertTemp(data.t10, isMetric)}°</td>
                </tr>
                <tr>
                  <td>Soil moisture</td>
                  <td>{Math.round(data.moisture * 100)}%</td>
                </tr>
              </tbody>
            </Table>
          }
        </CardBody>

    </Card>
  )
}

export default CombinedWeatherSoilCurrent;