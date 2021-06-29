import React from 'react';
import {getSoilData} from "../../services/api/polygonApi";
import {toDateShort} from '../../utils/DateTime'
import {Line} from "react-chartjs-2";
import {chartOptions} from './base'


const SoilChart = ({ id, defaultStartDate, defaultEndDate }) => {

  let [startDate, setStartDate] = React.useState(defaultStartDate);
  let [endDate, setEndDate] = React.useState(defaultEndDate);
  let [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    getSoilData(id, startDate, endDate)
      .then(response => {
        if (response) {
          setChartData(response)
        }
      })
      .catch(err => {console.log(err)})
  }, [startDate, endDate])

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
          // suggestedMin: 60,
          // suggestedMax: 125,
          // padding: 20,
          fontColor: "#9a9a9a",
        },
      },
      {
        id: "moisture",
        position: 'right',
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          // suggestedMin: 60,
          // suggestedMax: 125,
          // padding: 20,
          fontColor: "#9a9a9a",
        },
      }
  ]

  let data = (canvas) => {

    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    let gradientStrokeGreen = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeGreen.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStrokeGreen.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStrokeGreen.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    return {
      labels: chartData.map(el => toDateShort(el.dt)),
      datasets: [
        {
            label: "T10",
            yAxisID: "temperature",
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
            pointRadius: 4,
            data: chartData.map(el => el.t10.toFixed(3)),
        },
        {
            label: "Moisture",
            yAxisID: "moisture",
            fill: true,
            backgroundColor: gradientStrokeGreen,
            borderColor: "#00d6b4",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#00d6b4",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#00d6b4",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: chartData.map(el => el.moisture.toFixed(3)),
          },
          {
            label: "T0",
            yAxisID: "temperature",
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
            pointRadius: 4,
            data: chartData.map(el => el.t0.toFixed(3)),
        },
      ]
    }
  }

  return (
    <div className="chart-area">
      <Line
        data={data}
        options={options}
      />
    </div>
  )
}

export default SoilChart;