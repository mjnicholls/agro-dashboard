import React from 'react';
import {Line} from "react-chartjs-2";
import {useSelector} from 'react-redux';
import {convertSpeed, convertTemp} from "../../utils/utils";


import {chartOptions} from "./base";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";

const selectUnits = state => state.units.isMetric;

const HourlyForecast = ({data, isLoading, error}) => {

  const isMetric = useSelector(selectUnits);

  const options = JSON.parse(JSON.stringify(chartOptions))
  options.scales.yAxes = [
    {
      id: "temperature",
      display: false,
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
        },
        padding: 25
      },
    },
    {
      id: "precipitation",
      display: false,
      ticks: {
        beginAtZero: true,
      },
    }
  ]
  const whiteColor = "#ffffff"
  options.scales.xAxes = [
    {
      id: 'temp',
      offset: true,
      position: "top",
      ticks: {
        autoSkip: false,
        callback: label => convertTemp(label.temp, isMetric) + '°',
        fontColor: "#ba54f5"
      }
    },
    {
      id: "dt",
      offset: true,
      position: "top",
      ticks: {
        autoSkip: false,
        fontStyle: "bold",
        fontColor: "#ffffff",
        callback: label => label.dt
      }
    },
    {
      id: 'rain',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.rain + 'mm',
        fontColor: "#1f8ef1"
      }
    },
    {
      id: 'description',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.description,
        fontColor: whiteColor
      }
    },

    {
      id: 'windSpeed',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => convertSpeed(label.windSpeed, isMetric) + (isMetric ? 'm/s' : 'mph'),
        fontColor: whiteColor
      }
    },
    {
      id: 'pressure',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.pressure,
        fontColor: whiteColor
      }
    },
    {
      id: 'humidity',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.humidity,
        fontColor: whiteColor
      }
    },
    {
      id: 'dewPoint',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => convertTemp(label.dewPoint, isMetric) + '°',
        fontColor: whiteColor
      }
    },
    {
      id: 'uvi',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.uvi,
        fontColor: whiteColor
      }
    },
    {
      id: 'clouds',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.clouds,
        fontColor: whiteColor
      }
    }
  ]
  options.interaction = {
    intersect: false,
    mode: "index"

  }

  options.tooltips = {
    intersect: false,
    callbacks: {
      title: function(tooltipItem) {
        return tooltipItem[0].xLabel.dt;
      }
    }
  }
  // options.animation = {
  //   duration: 1,
  //   onComplete: function () {
  //     console.log("here")
  //     drawFixedYAxis(this.chart, yAxisRef);
  //   }
  // }



  let chartData = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.5)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: data,
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
          type: 'bar',
          data: data.map(el => el.rain),
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
          data: data.map(el => convertTemp(el.temp, isMetric)),
          type: "LineWithLine"
        },
      ]
    }
  }

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" xs="6" sm="8">
              <h5 className="card-category">Forecast</h5>
              <CardTitle tag="h2">Hourly</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody style={{overflowX: "auto"}}>
            {isLoading ?
              <div className="chart-placeholder">Fetching data...</div> :
              error ?
                <div className="chart-placeholder">{error}</div>  :
                <div className="chart-area hourly-chart">
                  {/*<canvas ref={yAxisRef}/>*/}
                  <Line
                    className="hourly-chart-canvas"
                    data={chartData}
                    options={options}
                    height={400}
                    width={2000}
                  />
                </div>
            }
        </CardBody>
      </Card>
    </>
  )
}

export default HourlyForecast;