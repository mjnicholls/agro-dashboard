import React from 'react';
import {Line} from "react-chartjs-2";

import {chartOptions} from "./base";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";

const DailyForecast = ({data, isLoading, error}) => {

  const options = JSON.parse(JSON.stringify(chartOptions))
  options.scales.yAxes = [
    {
      id: "temp",
      display: false,
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
      id: 'tempMax',
      offset: true,
      position: "top",
      ticks: {
        autoSkip: false,
        callback: label => label.tempMax + '°',
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
      id: 'tempMin',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.tempMin + '°',
        fontColor: "#ba54f5"
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
        callback: label => label.windSpeed,
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
        callback: label => label.dewPoint,
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

    let gradientStrokePurple = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStrokePurple.addColorStop(1, "rgba(72,72,176,0.4)");
    gradientStrokePurple.addColorStop(0.8, "rgba(72,72,176,0.2)");
    gradientStrokePurple.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

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
          label: "Temperature Max",
          yAxisID: "temp",
          fill: "+1",
          backgroundColor: gradientStrokePurple,
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
          data: data.map(el => el.tempMax),
          type: "LineWithLine"
        },
        {
          label: "Temperature Min",
          yAxisID: "temp",
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
          data: data.map(el => el.tempMin),
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
              <CardTitle tag="h2">Daily</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
            {isLoading ?
              <div className="chart-placeholder">Fetching data...</div> :
              error ?
                <div className="chart-placeholder">{error}</div>  :
                <div className="chart-area agro-chart">
                  <Line
                    data={chartData}
                    options={options}
                    height={400}
                    // width={1000}
                  />
                </div>
            }
        </CardBody>
      </Card>
    </>
  )
}

export default DailyForecast;