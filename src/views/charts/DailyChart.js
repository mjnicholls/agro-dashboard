import React from 'react'
import { Line } from 'react-chartjs-2'

import { convertTemp } from '../../utils/utils'
import { chartOptions } from './base'
import { formatDateShort } from '../../utils/dateTime'
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

const DailyChart = ({ isMetric, onecall }) => {
  const options = JSON.parse(JSON.stringify(chartOptions))
  options.scales.yAxes = [
    {
      id: 'temp',
      display: false,
    },
    {
      id: 'precipitation',
      display: false,
      ticks: {
        beginAtZero: true,
      },
    },
  ]
  const whiteColor = '#ffffff'
  options.scales.xAxes = [
    {
      id: 'tempMax',
      offset: true,
      position: 'top',
      ticks: {
        autoSkip: false,
        callback: (el) => formatTemp(el.temp.max, isMetric),
        fontColor: '#ba54f5',
      },
    },
    {
      id: 'description',
      offset: true,
      position: 'top',
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
        fontColor: '#ffffff',
        callback: (el) => formatDateShort(el.dt, onecall.data.timezone_offset),
      },
    },
    {
      id: 'tempMin',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => formatTemp(el.temp.min, isMetric),
        fontColor: '#ba54f5',
      },
    },
    {
      id: 'rain',
      offset: true,
      ticks: {
        autoSkip: false,
        callback: (el) => `${(0 + el.rain || 0 + el.snow || 0).toFixed(2)}mm`,
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
        return formatDateShort(
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
        }${tooltipItem.datasetIndex === 2 ? 'mm' : '°'}`
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

    const gradientStrokePurple = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStrokePurple.addColorStop(1, 'rgba(72,72,176,0.4)')
    gradientStrokePurple.addColorStop(0.8, 'rgba(72,72,176,0.2)')
    gradientStrokePurple.addColorStop(0, 'rgba(119,52,169,0)') // purple colors

    return {
      labels: onecall.data.daily,
      datasets: [
        {
          label: 'Max temp',
          yAxisID: 'temp',
          fill: '+1',
          backgroundColor: gradientStrokePurple,
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
          data: onecall.data.daily.map((el) =>
            convertTemp(el.temp.max, isMetric),
          ),
          type: 'LineWithLine',
        },
        {
          label: 'Min temp',
          yAxisID: 'temp',
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
          data: onecall.data.daily.map((el) =>
            convertTemp(el.temp.min, isMetric),
          ),
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
          data: onecall.data.daily.map((el) => el.rain),
        },
      ],
    }
  }

  return (
    <ChartContainer isLoading={onecall.isLoading} error={onecall.error}>
      <Line data={chartData} options={options} height={400} />
    </ChartContainer>
  )
}

export default DailyChart
