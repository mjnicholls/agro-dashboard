import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";

import {getOneCallData} from '../../services/api/weatherApi';
import {chartOptions} from "./base";
import {timeInHours} from '../../utils/dateTime';
import {kelvinToCelsius} from '../../utils/utils';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const HourlyForecast = ({polygon}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (polygon) {
      getOneCallData(polygon.center[0], polygon.center[1])
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
  }, [polygon])

  const options = JSON.parse(JSON.stringify(chartOptions))

  options.scales.yAxes = [
    {
        id: "temperature",
        position: 'left',
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          fontColor: "#9a9a9a",
          maxTicksLimit: 6,
          callback: function (value) {
            return value + '°';
          }
        },
      },
      {
        id: "precipitation",
        position: 'right',
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 6,
          fontColor: "#9a9a9a",
          callback: function (value) {
            return value + 'mm';
          }
        },
      }
  ]
  options.scales.xAxes = [{
    ticks: {
      autoSkip: false,
    }
  }]

  let chartData = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    const offset = data.timezone_offset;
    let rainData = [];
    let hourLabels = [];
    let tempData = [];
    for (let i = 0; i < data.hourly.slice(0, 12).length; i++) {
      let hour = data.hourly[i];
      let prec = 0;
      if (hour.rain && hour.rain['1h']) {
        prec += hour.rain['1h'];
      }
      if (hour.snow && hour.snow['1h']) {
        prec += hour.snow['1h'];
      }
      rainData.push(prec.toFixed(2));
      tempData.push(kelvinToCelsius(hour.temp))
      hourLabels.push(timeInHours(hour.dt, offset));
    }

    return {
      labels: hourLabels,
      datasets: [
        {
          label: "Precipitation",
          yAxisID: "precipitation",
          fill: true,
          backgroundColor: gradientStrokeBlue,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: rainData,
        },
        {
          label: "Temperature",
          yAxisID: "temperature",
          fill: false,
          borderColor: "#ba54f5",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#ba54f5",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#ba54f5",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: tempData,
        },
      ]
    }
  }

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
          {isLoading ?
            <div className="chart-placeholder">Fetching data...</div> :
            error ?
              <div className="chart-placeholder">{error}</div>  :
              <div className="chart-area">
                <Line
                  data={chartData}
                  options={options} />
              </div>
          }
      </CardBody>
    </Card>
  )
}

export default HourlyForecast;