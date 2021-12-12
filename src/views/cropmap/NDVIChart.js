import React from 'react'

import { Scatter } from 'react-chartjs-2'

import { makeGradientGreen } from '../../utils/charts'

const CropMapChart = ({ dates, values }) => {
  const parseNDVIVal = (val) => {
    const res = parseFloat(val)
    return res > 0 ? res.toFixed(2) : 0
  }

  const makeData = () => {
    const datesArr = dates.split(',')
    const valuesArr = values.split(',')
    const newData = []
    for (let i = 0; i < datesArr.length; i += 1) {
      const tmp = {
        x: parseInt(datesArr[i] * 1000, 10),
        y: parseNDVIVal(valuesArr[i]),
      }
      newData.push(tmp)
    }
    return newData
  }

  const data = (canvas) => {
    const gradientStroke = makeGradientGreen(canvas, 1, 0.5)

    return {
      datasets: [
        {
          data: makeData(),
          backgroundColor: gradientStroke,
          borderColor: '#00d6b4',
          showLine: true,
          borderWidth: 1,
          pointRadius: 2,
          pointBackgroundColor: '#00d6b4',
        },
      ],
    }
  }

  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            tooltipFormat: 'MMM D, YYYY',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return <Scatter data={data} options={options} />
}

export default CropMapChart
