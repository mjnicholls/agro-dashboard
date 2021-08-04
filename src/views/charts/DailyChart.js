import React from 'react';
import {Line} from "react-chartjs-2";

import {convertTemp, convertSpeed, capitalize} from "../../utils/utils";
import {chartOptions} from "./base";
import {formatDateShort} from "../../utils/dateTime";


const DailyChart = ({isMetric, data}) => {
  
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
        callback: el => convertTemp(el.temp.max, isMetric) + '°',
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
        callback: el => formatDateShort(el.dt, data.timezone_offset)
      }
    },
    {
      id: 'tempMin',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => convertTemp(el.temp.min, isMetric) + '°',
        fontColor: "#ba54f5"
      }
    },
    {
      id: 'rain',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => (0 + el.rain || 0 + el.snow || 0).toFixed(2) + 'mm',
        fontColor: "#1f8ef1"
      }
    },
    {
      id: 'description',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => capitalize(el.weather[0].description).split(' '),
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
        callback: el =>  Math.round(el.uvi),
        fontColor: whiteColor
      }
    },
    {
      id: 'clouds',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: el => el.clouds + "%",
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
      labels: data.daily,
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
          data: data.daily.map(el => el.rain),
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
          data: data.daily.map(el => convertTemp(el.temp.max, isMetric)),
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
          data: data.daily.map(el => convertTemp(el.temp.min, isMetric)),
          type: "LineWithLine"
        },
      ]
    }
  }

  return (<Line
    data={chartData}
    options={options}
    height={400}
  />)
}

export default DailyChart;