/* eslint-disable */
import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { tariffError } from '../../config'
import { getAccumulatedData } from '../../api/apiCharts'
import { toDate } from '../../utils/dateTime'
import { chartOptions } from './base'
import ChartContainer from './ui/ChartContainer'
import { makeGradientBlue } from '../../utils/charts'

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
          if (!tempData.length || !rainData.length) {
            setError('No data for selected period')
          } else {
            setTempData(tempData)
            setRainData(rainData)
          }
        })
        .catch((err) => {
          setError(err.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [startDate, endDate, polyId, earliestAvailableDate, threshold, isMetric])

  useEffect(() => {
    let convertedTemp
    if (isMetric) {
      convertedTemp = tempData.map((el) =>
        el.temp ? el.temp - 273.15 * el.count : 0,
      )
    } else {
      convertedTemp = tempData.map(
        (el) => el.temp * 1.8 - 273.15 * 1.8 * el.count + 32 * el.count,
      )
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
        return `${data.datasets[tooltipItem.datasetIndex].label}: ${parseFloat(
          tooltipItem.value,
        ).toFixed(2)}${tooltipItem.datasetIndex ? 'mm' : '°'}`
      },
    },
  }

  const chartData = (canvas) => {
    const gradientStroke = makeGradientBlue(canvas)

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
          backgroundColor: gradientStroke,
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
