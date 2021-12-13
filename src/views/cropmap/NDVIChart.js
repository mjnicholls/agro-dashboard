import React from 'react'

import { Scatter } from 'react-chartjs-2'

import { Col, Row } from 'reactstrap'

import { makeGradientGreen } from '../../utils/charts'

const CropMapChart = ({ info, activeYear }) => {
  const makeData = () => {
    const datesArr = info.ndvi_dt.split(',')
    const valuesArr = info.ndvi_ts.split(',')
    const newData = []
    for (let i = 0; i < datesArr.length; i += 1) {
      const timestamp = parseInt(datesArr[i] * 1000, 10)
      const newDate = new Date(timestamp)

      if (newDate.getFullYear() > activeYear.year) {
        break
      }

      const newVal = parseFloat(valuesArr[i])
      if (newVal >= 0) {
        newData.push({
          x: timestamp,
          y: newVal,
        })
      }
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

  return (
    <>
      <Row>
        <Col className="my-2">
          <h4>
            <b>History NDVI</b>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Scatter data={data} options={options} />
        </Col>
      </Row>
    </>
  )
}

export default CropMapChart
