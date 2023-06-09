import React, { useEffect, useState } from 'react'

import axios from 'axios/index'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { getHistoryWeatherData } from '../../api/apiCharts'
import { tariffError } from '../../config'
import { toDate } from '../../utils/dateTime'
import { convertTemp } from '../../utils/utils'
import { chartOptions } from './base'
import ChartContainer from './ui/ChartContainer'

const selectUnits = (state) => state.units.isMetric

const HistoricalWeather = ({
  polyId,
  startDate,
  endDate,
  earliestAvailableDate,
}) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(startDate ? null : tariffError)
  const [isLoading, setIsLoading] = useState(startDate)

  const isMetric = useSelector(selectUnits)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    if (startDate && endDate && polyId) {
      setIsLoading(true)
      setError(null)
      getHistoryWeatherData(
        polyId,
        Math.max(startDate, earliestAvailableDate),
        Math.max(endDate, earliestAvailableDate),
        cancelToken,
      )
        .then((response) => {
          if (response) {
            if (response.length) {
              setData(response)
            } else {
              setError('No data for selected period')
            }
          } else {
            setError('Failed to fetch data')
          }
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    return () => {
      cancelToken.cancel()
    }
  }, [polyId, startDate, endDate, earliestAvailableDate])

  const options = JSON.parse(JSON.stringify(chartOptions))

  options.scales.yAxes = [
    {
      id: 'temperature',
      position: 'left',
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        fontColor: '#9a9a9a',
        callback(value) {
          return `${value}°`
        },
      },
    },
    {
      id: 'precipitation',
      position: 'right',
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        fontColor: '#9a9a9a',
        beginAtZero: true,
        callback(value) {
          return `${value}mm`
        },
      },
    },
  ]

  options.tooltips = {
    ...options.tooltips,
    callbacks: {
      label(tooltipItem, chartData) {
        return `${chartData.datasets[tooltipItem.datasetIndex].label}: ${
          tooltipItem.value
        }${tooltipItem.datasetIndex === 2 ? 'mm' : '°'}`
      },
    },
  }

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50)
    gradientStrokeBlue.addColorStop(1, 'rgba(29,140,248,0.2)')
    gradientStrokeBlue.addColorStop(0.4, 'rgba(29,140,248,0.0)')
    gradientStrokeBlue.addColorStop(0, 'rgba(29,140,248,0)') // blue colors

    const gradientStrokePurple = ctx.createLinearGradient(0, 230, 0, 50)

    gradientStrokePurple.addColorStop(1, 'rgba(72,72,176,0.4)')
    gradientStrokePurple.addColorStop(0.8, 'rgba(72,72,176,0.2)')
    gradientStrokePurple.addColorStop(0, 'rgba(119,52,169,0)') // purple colors
    const purple = '#ba54f5'
    const blue = '#1f8ef1'

    const labels = []
    const rainData = []
    for (let i = 0; i < data.length; i += 1) {
      const el = data[i]
      labels.push(toDate(el.dt)) // TODO local date
      const prec =
        0 +
        (el.rain ? el.rain['1h'] || 0 : 0) +
        (el.snow ? el.snow['1h'] || 0 : 0)
      rainData.push(prec.toFixed(2))
    }

    return {
      labels,
      datasets: [
        {
          label: 'Maximum temperature',
          yAxisID: 'temperature',
          fill: '+1',
          backgroundColor: gradientStrokePurple,
          borderColor: purple,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: purple,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: purple,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: data.map((item) => convertTemp(item.main.temp_max, isMetric)),
          tension: 0.1,
        },
        {
          label: 'Minimum temperature',
          yAxisID: 'temperature',
          fill: false,
          borderColor: purple,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: purple,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: purple,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: data.map((item) => convertTemp(item.main.temp_min, isMetric)),
          tension: 0.1,
        },
        {
          label: 'Precipitation',
          yAxisID: 'precipitation',
          fill: true,
          backgroundColor: gradientStrokeBlue,
          borderColor: blue,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: blue,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: blue,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: rainData,
          tension: 0.1,
          type: 'bar',
        },
      ],
    }
  }

  return (
    <ChartContainer isLoading={isLoading} error={error}>
      <Line data={chartData} options={options} />
    </ChartContainer>
  )
}

export default HistoricalWeather
