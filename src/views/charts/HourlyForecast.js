import React from 'react';
import {Line} from "react-chartjs-2";
import {useSelector} from 'react-redux';
import {capitalize, convertSpeed, convertTemp} from "../../utils/utils";
import {timeInHours} from "../../utils/dateTime";

import {chartOptions} from "./base";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import ChartContainer from './ui/ChartContainer';

const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const HourlyForecast = () => {

  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);


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
        callback: el => convertTemp(el.temp, isMetric) + '°',
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
        callback: el => timeInHours(el.dt, onecall.data.timezone_offset)
      }
    },
    {
      id: 'rain',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => (0 + (el.rain && el.rain['1h']) ? el.rain['1h'] : 0 + (el.snow && el.snow['1h']) ? el.snow['1h'] : 0).toFixed(2) + 'mm',
        fontColor: "#1f8ef1"
      }
    },
    {
      id: 'description',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => capitalize(el.weather[0].description).split(" "),
        fontColor: whiteColor
      }
    },

    {
      id: 'windSpeed',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => convertSpeed(el.wind_speed, isMetric) + (isMetric ? 'm/s' : 'mph'),
        fontColor: whiteColor
      }
    },
    {
      id: 'pressure',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => el.pressure + "hPa",
        fontColor: whiteColor
      }
    },
    {
      id: 'humidity',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => el.humidity + "%",
        fontColor: whiteColor
      }
    },
    {
      id: 'dewPoint',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => convertTemp(el.dew_point, isMetric) + '°',
        fontColor: whiteColor
      }
    },
    {
      id: 'uvi',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => Math.round(el.uvi),
        fontColor: whiteColor
      }
    },
    {
      id: 'clouds',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => el.clouds + '%',
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
      labels: onecall.data.hourly,
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
          data: onecall.data.hourly.map(el => 0 + (el.rain && el.rain['1h']) ? el.rain['1h'] : 0 + (el.snow && el.snow['1h']) ? el.snow['1h'] : 0),
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
          data: onecall.data.hourly.map(el => convertTemp(el.temp, isMetric)),
          type: "LineWithLine"
        },
      ]
    }
  }

  return (
      <Card className="card-chart hourly-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" xs="6" sm="8">
              <h5 className="card-category">Forecast</h5>
              <CardTitle tag="h2">Hourly</CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody style={{overflowX: "auto"}}>
          <ChartContainer
            isLoading={onecall.isLoading}
            error={onecall.error} >
            <Line
              className="hourly-chart-canvas"
              data={chartData}
              options={options}
              height={500}
              width={2000}
            />
          </ChartContainer>
        </CardBody>
      </Card>
  )
}

export default HourlyForecast;