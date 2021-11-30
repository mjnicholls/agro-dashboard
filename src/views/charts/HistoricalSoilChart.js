import React, { useState } from 'react'

import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { getHistorySoilData } from '../../api/apiCharts'
import { tariffError } from '../../config'
import { toDate } from '../../utils/dateTime'
import { convertTemp } from '../../utils/utils'
import { chartOptions } from './base'
import ChartContainer from './ui/ChartContainer'

const selectUnits = (state) => state.units.isMetric

const HistoricalSoilChart = ({
  polyId,
  startDate,
  endDate,
  earliestAvailableDate,
}) => {
  const units = useSelector(selectUnits)

  const [data, setData] = useState([])
  const [error, setError] = useState(startDate ? null : tariffError)
  const [isLoading, setIsLoading] = useState(startDate)

  React.useEffect(() => {
    const cancelToken = axios.CancelToken.source()
    if (startDate && endDate && polyId) {
      setIsLoading(true)
      setError(null)
      getHistorySoilData(
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
  }, [startDate, endDate, polyId, earliestAvailableDate])

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
        maxTicksLimit: 6,
        fontColor: '#9a9a9a',
        callback(value) {
          return `${value}°`
        },
      },
    },
    {
      id: 'moisture',
      position: 'right',
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        maxTicksLimit: 6,
        fontColor: '#9a9a9a',
      },
    },
  ]

  options.tooltips = {
    ...options.tooltips,
    callbacks: {
      label(tooltipItem, chartData) {
        return `${chartData.datasets[tooltipItem.datasetIndex].label}: ${
          tooltipItem.value
        }${tooltipItem.datasetIndex === 2 ? '' : '°'}`
      },
    },
  }

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d')

    const gradientStrokeGreen = ctx.createLinearGradient(0, 230, 0, 50)
    gradientStrokeGreen.addColorStop(1, 'rgba(66,134,121,0.15)')
    gradientStrokeGreen.addColorStop(0.4, 'rgba(66,134,121,0.0)') // green colors
    gradientStrokeGreen.addColorStop(0, 'rgba(66,134,121,0)') // green colors

    return {
      labels: data.map((el) => toDate(el.dt)),
      datasets: [
        {
          label: 'Temperature at a depth of 10cm',
          yAxisID: 'temperature',
          fill: false,
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
          data: data.map((el) => convertTemp(el.t10, units)),
        },
        {
          label: 'Temperature at the surface',
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
          data: data.map((el) => convertTemp(el.t0, units)),
        },
        {
          label: 'Moisture',
          yAxisID: 'moisture',
          fill: true,
          backgroundColor: gradientStrokeGreen,
          borderColor: '#00d6b4',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00d6b4',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00d6b4',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: data.map((el) => el.moisture.toFixed(2)),
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

export default HistoricalSoilChart
