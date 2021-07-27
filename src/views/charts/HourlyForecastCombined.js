import React, {useEffect, useRef, useState} from 'react';
import {Line} from "react-chartjs-2";
import Chart from "chart.js";

import {getOneCallData} from '../../services/api/weatherApi';
import HourlyTable from './HourlyTable';
import {chartOptions} from "./base";
import {timeInHours} from '../../utils/dateTime';
import {capitalize, kelvinToCelsius} from '../../utils/utils';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";

const HourlyForecast = ({polygon}) => {

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  Chart.defaults.LineWithLine = Chart.defaults.line;
  Chart.controllers.LineWithLine = Chart.controllers.line.extend({
     draw: function(ease) {
       Chart.controllers.line.prototype.draw.call(this, ease);

       if (this.chart.tooltip._active && this.chart.tooltip._active.length) {

         var activePoint = this.chart.tooltip._active[0],
           ctx = this.chart.ctx,
           x = activePoint.tooltipPosition().x,
           topY = this.chart.legend.bottom,
           // bottomY = this.chart.chartArea.bottom;
           bottomY = 450;
         let barWidth = this.chart.getDatasetMeta(0).data[0]._view.width + 10;
         // draw line
         ctx.globalCompositeOperation = 'destination-over';
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = barWidth;
         ctx.strokeStyle = '#32325d';
         ctx.stroke();
         ctx.restore();
         ctx.globalCompositeOperation = "source-over";
       }
     }
  });
  const yAxisRef = useRef(null);
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (polygon) {
      getOneCallData(polygon.center[0], polygon.center[1])
        .then(res => {
          const offset = res.timezone_offset;
          let arr = [];
          for (let i = 0; i < res.hourly.length; i++) {
            let hour = res.hourly[i];
            let prec = 0 + (hour.rain && hour.rain['1h']) ? hour.rain['1h'] : 0 + (hour.snow && hour.snow['1h']) ? hour.snow['1h'] : 0;
            arr.push({
              dt: timeInHours(hour.dt, offset),
              rain: prec.toFixed(2),
              temp: kelvinToCelsius(hour.temp),
              windSpeed: hour.wind_speed.toFixed(1) + 'm/s',
              pressure: hour.pressure + "hPa",
              humidity: hour.humidity + "%",
              dewPoint: kelvinToCelsius(hour.dew_point) + "°" ,
              uvi: Math.round(hour.uvi),
              clouds: hour.clouds + '%',
              description: capitalize(hour.weather[0].description).split(' ')
            });
          }
          setData(arr);
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
          },
          padding: 25
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
          },
          padding: 25
        },
      }
  ]
  options.scales.xAxes = [
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
      id: 'temp',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.temp + '°',
        fontColor: "#ba54f5"
      }
    },
    {
      id: 'description',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.description
      }
    },

    {
      id: 'windSpeed',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.windSpeed
      }
    },
    {
      id: 'pressure',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.pressure
      }
    },
    {
      id: 'humidity',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.humidity
      }
    },
    {
      id: 'dewPoint',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.dewPoint
      }
    },
    {
      id: 'uvi',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.uvi
      }
    },
    {
      id: 'clouds',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: label => label.clouds
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
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: data,
      datasets: [
        {
          label: "Precipitation",
          yAxisID: "precipitation",
          xAxisID: "dt",
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
          xAxisID: "dt",
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
          data: data.map(el => el.temp),
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
      {data && <HourlyTable
        data={data}
      />}
    </>
  )
}

export default HourlyForecast;