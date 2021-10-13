import React from 'react'

import { Line } from 'react-chartjs-2'

import { timeInHours } from '../../utils/dateTime'
import { convertTemp } from '../../utils/utils'
import { chartOptions } from './base'
import ChartContainer from './ui/ChartContainer'
import {
  formatClouds,
  formatDesc,
  formatHumidity,
  formatPressure,
  formatUvi,
  formatWindSpeed,
  formatTemp,
} from './utils'

const whiteColor = '#ffffff'

const HourlyChart = ({ isMetric, onecall }) => {
  const options = JSON.parse(JSON.stringify(chartOptions))

  const countPrecipitation = (el) => {
    let res = 0
    if (el.rain && el.rain['1h']) {
      res += el.rain['1h']
    }
    if (el.snow && el.snow['1h']) {
      res += el.snow['1h']
    }
    return res
  }

  options.scales.yAxes = [
    {
      id: 'temperature',
      display: false,
      position: 'left',
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        fontColor: '#9a9a9a',
        maxTicksLimit: 6,
        callback(value) {
          return `${value}°`
        },
        padding: 25,
      },
    },
    {
      id: 'precipitation',
      display: false,
      ticks: {
        beginAtZero: true,
      },
    },
  ]

  options.scales.xAxes = [
    {
      id: 'temp',
      offset: true,
      position: 'top',
      ticks: {
        autoSkip: false,
        callback: (el) => formatTemp(el.temp, isMetric),
        fontColor: '#ba54f5',
      },
    },
    {
      id: 'description',
      position: 'top',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatDesc(el).split(' '),
        fontColor: whiteColor,
      },
    },
    {
      id: 'dt',
      offset: true,
      position: 'top',
      ticks: {
        autoSkip: false,
        fontStyle: 'bold',
        fontColor: whiteColor,
        callback: (el) => timeInHours(el.dt, onecall.data.timezone_offset),
      },
    },
    {
      id: 'rain',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => `${countPrecipitation(el).toFixed(2)}mm`,
        fontColor: '#1f8ef1',
      },
    },

    {
      id: 'windSpeed',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatWindSpeed(el, isMetric),
        fontColor: whiteColor,
      },
    },
    {
      id: 'pressure',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatPressure(el),
        fontColor: whiteColor,
      },
    },
    {
      id: 'humidity',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatHumidity(el),
        fontColor: whiteColor,
      },
    },
    {
      id: 'dewPoint',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatTemp(el.dew_point, isMetric),
        fontColor: whiteColor,
      },
    },
    {
      id: 'uvi',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatUvi(el),
        fontColor: whiteColor,
      },
    },
    {
      id: 'clouds',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatClouds(el),
        fontColor: whiteColor,
      },
    },
  ]
  options.interaction = {
    intersect: false,
    mode: 'index',
  }

  options.tooltips = {
    ...options.tooltips,
    intersect: false,
    callbacks: {
      title(tooltipItem) {
        return timeInHours(
          tooltipItem[0].xLabel.dt,
          onecall.data.timezone_offset,
        )
      },
      afterTitle(tooltipItem) {
        return formatDesc(tooltipItem[0].xLabel)
      },
      label(tooltipItem, data) {
        return `${data.datasets[tooltipItem.datasetIndex].label}: ${
          tooltipItem.yLabel ? tooltipItem.yLabel : 0
        }${tooltipItem.datasetIndex ? 'mm' : '°'}`
      },
      afterBody(tooltipItem) {
        const source = tooltipItem[0].xLabel

        const windSpeed = `Wind speed: ${formatWindSpeed(source, isMetric)}`
        const pressure = `Pressure: ${formatPressure(source)}`
        const humidity = `Humidity: ${formatHumidity(source)}`
        const dewPoint = `Dew point: ${formatTemp(source.dew_point, isMetric)}`
        const uvi = `UVI index: ${formatUvi(source)}`
        const clouds = `Clouds: ${formatClouds(source)}`
        return ['', windSpeed, pressure, humidity, dewPoint, uvi, clouds]
      },
    },
  }

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50)
    gradientStrokeBlue.addColorStop(1, 'rgba(29,140,248,0.5)')
    gradientStrokeBlue.addColorStop(0, 'rgba(29,140,248,0)') // blue colors

    return {
      labels: onecall.data.hourly,
      datasets: [
        {
          label: 'Temperature',
          yAxisID: 'temperature',
          fill: false,
          borderColor: '#ba54f5',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ba54f5',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ba54f5',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: onecall.data.hourly.map((el) => convertTemp(el.temp, isMetric)),
          type: 'LineWithLine',
        },
        {
          label: 'Precipitation',
          yAxisID: 'precipitation',
          fill: true,
          backgroundColor: gradientStrokeBlue,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#1f8ef1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#1f8ef1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          type: 'bar',
          data: onecall.data.hourly.map((el) => countPrecipitation(el)),
        },
      ],
    }
  }

  return (
    <ChartContainer
      isLoading={onecall.isLoading}
      error={onecall.error}
      style={{ height: '400px' }}
    >
      <Line
        className="hourly-chart-canvas"
        data={chartData}
        options={options}
        height={500}
        width={2000}
      />
    </ChartContainer>
  )
}

export default HourlyChart
