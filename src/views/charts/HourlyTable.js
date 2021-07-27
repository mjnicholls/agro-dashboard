import React, {useEffect, useState} from 'react';
import {capitalize} from '../../utils/utils';


import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table
} from "reactstrap";
import {kelvinToCelsius} from "../../utils/utils";

const HourlyTable = ({data}) => {
  // Hourly:
  // temp, pressure, humidity, dew_point, uvi, precipitation amount, clouds, wind speed,
  // weather description (main/description)

  return (
     <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Forecast</h5>
            <CardTitle tag="h2">Hourly</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="table-wrapper">
          <Table>
            <thead>
              <tr>
                <th className="headcol"></th>
                {data.map((el, index) => <th key={'th_' + index}>{el.dt}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="headcol">Temperature</td>
                {data.map((el, index) => <td key={'temp_' + index}>{el.temp}°</td>)}
              </tr>
              <tr>
                <td className="headcol">Precipitation</td>
                {data.map((el, index) => <td key={'prec_' + index}>{el.rain}mm</td>)}
              </tr>
              <tr>
                <td className="headcol">Pressure</td>
                {data.map((el, index) => <td key={'pressure_' + index}>{el.pressure}</td>)}
              </tr>
              <tr>
                <td className="headcol">Humidity</td>
                {data.map((el, index) => <td key={'humidity_' + index}>{el.humidity}</td>)}
              </tr>
              <tr>
                <td className="headcol">Dew point</td>
                {data.map((el, index) => <td key={'humidity_' + index}>{el.dewPoint}</td>)}
              </tr>
              <tr>
                <td className="headcol">UVI</td>
                {data.map((el, index) => <td key={'uvi_' + index}>{el.uvi}</td>)}
              </tr>
              <tr>
                <td className="headcol">Clouds</td>
                {data.map((el, index) => <td key={'clouds_' + index}>{el.clouds}</td>)}
              </tr>
              <tr>
                <td className="headcol">Wind speed</td>
                {data.map((el, index) => <td key={'wind_speed_' + index}>{el.windSpeed}</td>)}
              </tr>
              <tr>
                <td className="headcol">Weather description</td>
                {data.map((el, index) => <td key={'weather_condition_' + index}>{el.description}</td>)}
              </tr>
            </tbody>
        </Table>
        </div>
      </CardBody>
     </Card>
  )
}


export default HourlyTable;