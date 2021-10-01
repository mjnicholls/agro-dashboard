import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Line } from 'react-chartjs-2'

import ChartContainer from './ui/ChartContainer'
import { getAccumulatedData } from '../../services/api/chartApi'
import { toDate } from '../../utils/dateTime'
import { chartOptions } from './base'
import { tariffError } from '../../config'

const selectUnits = (state) => state.units.isMetric

const AccumulatedChart = ({
  polyId,
  startDate,
  endDate,
  threshold,
  earliestAvailableDate,
}) => {
  const [error, setError] = useState(startDate ? null : tariffError)
  const [isLoading, setIsLoading] = useState(startDate)

  const isMetric = useSelector(selectUnits)

  const [rainData, setRainData] = useState([])
  const [tempData, setTempData] = useState([])
  const [convertedTempData, setConvertedTempData] = useState([])

  useEffect(() => {
    if (startDate && endDate && polyId) {
      setIsLoading(true)
      setError(null)
      const thresholdKelvin = isMetric
        ? parseInt(threshold) + 273.15
        : ((parseInt(threshold) + 459.67) * 5) / 9
      getAccumulatedData(
        polyId,
        Math.max(startDate, earliestAvailableDate),
        Math.max(endDate, earliestAvailableDate),
        thresholdKelvin,
      )
        .then((res) => {
          const [tempData, rainData] = res
          setTempData(tempData)
          setRainData(rainData)
        })
        .catch((err) => {
          if (typeof err === 'object') {
            err = err.message || 'Something went wrong'
          }
          setError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [startDate, endDate, polyId, earliestAvailableDate, threshold, isMetric])

  useEffect(() => {
    let convertedTemp = tempData.map((el) =>
      el.temp ? el.temp - 273.15 * el.count : 0,
    )
    if (!isMetric) {
      convertedTemp = convertedTemp.map((el) => (el ? (el * 9) / 5 + 32 : 32))
    }
    setConvertedTempData(convertedTemp)
  }, [tempData, isMetric])

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
        beginAtZero: true,
        fontColor: '#9a9a9a',
        callback(value) {
          return `${value}°`
        },
      },
    },
    {
      id: 'rainfall',
      position: 'right',
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: 'transparent',
      },
      ticks: {
        maxTicksLimit: 6,
        beginAtZero: true,
        fontColor: '#9a9a9a',
        callback(value) {
          return `${value} mm`
        },
      },
    },
  ]
  options.tooltips = {
    ...options.tooltips,
    callbacks: {
      label(tooltipItem, data) {
        return `${data.datasets[tooltipItem.datasetIndex].label}: ${
          tooltipItem.value
        }${tooltipItem.datasetIndex ? 'mm' : '°'}`
      },
    },
  }

  const chartData = (canvas) => {
    const ctx = canvas.getContext('2d')
    const gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50)
    gradientStrokeBlue.addColorStop(1, 'rgba(29,140,248,0.2)')
    gradientStrokeBlue.addColorStop(0.4, 'rgba(29,140,248,0.0)')
    gradientStrokeBlue.addColorStop(0, 'rgba(29,140,248,0)')

    return {
      labels: tempData.map((el) => toDate(el.dt)),
      datasets: [
        {
          label: 'Temperature',
          yAxisID: 'temperature',
          fill: false,
          borderColor: '#be55ed',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#be55ed',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#be55ed',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: convertedTempData,
        },
        {
          label: 'Rainfall',
          yAxisID: 'rainfall',
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
          data: rainData.map((el) => el.rain.toFixed(2)),
          type: 'bar',
        },
      ],
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <ChartContainer isLoading={isLoading} error={error}>
        <Line data={chartData} options={options} />
      </ChartContainer>
    </div>
  )
}

export default AccumulatedChart
