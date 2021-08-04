import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {convertTemp} from "../../utils/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

import {getCurrentSoil} from "../../services/api/weatherApi";

const selectUnits = state => state.units.isMetric;

const CurrentSoil = ({ polyId }) => {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMetric = useSelector(selectUnits);

  useEffect(() => {
    getCurrentSoil(polyId)
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
  }, [])


  return (
    <Card>
      <CardHeader>
        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Current</h5>
            <CardTitle tag="h2">Soil data</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> :
          error ?
            <div className="chart-placeholder">{error}</div>  :
            <div>
              <div className="horizontal-container justify">
                <p className="card-category" style={{textTransform: "none"}}>Soil temperature at the surface</p>
                <CardTitle tag="h3">{convertTemp(data.t0, isMetric)}°</CardTitle>
              </div>
              <div className="horizontal-container justify">
                <p className="card-category" style={{textTransform: "none"}}>Soil temperature at the depth of 10cm</p>
                <CardTitle tag="h3">{convertTemp(data.t10, isMetric)}°</CardTitle>
              </div>
              <div className="horizontal-container justify">
                <p className="card-category" style={{textTransform: "none"}}>Soil moisture</p>
                <CardTitle tag="h3">{Math.round(data.moisture * 100)}%</CardTitle>
              </div>
            </div>
           }
      </CardBody>
    </Card>
  )
}

export default CurrentSoil;