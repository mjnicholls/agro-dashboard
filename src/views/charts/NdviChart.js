import React from 'react';
import {getNDVIData} from "../../services/api/polygonApi";
import {toDate} from '../../utils/DateTime'
import {Line} from "react-chartjs-2";
import {chartOptions} from './base'


const NdviChart = ({ id, defaultStartDate, defaultEndDate }) => {

  let [startDate, setStartDate] = React.useState(defaultStartDate);
  let [endDate, setEndDate] = React.useState(defaultEndDate);
  let [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    getNDVIData(id, startDate, endDate)
      .then(response => {
        if (response) {
          setChartData(response)
        }
      })
  }, [startDate, endDate])


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
      labels: chartData.map(el => toDate(el.dt)),
      datasets: [
        {
            label: "min",
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
            data: chartData.map(el => el.data.min.toFixed(3)),
        },
        {
            label: "mean",
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
            data: chartData.map(el => el.data.mean.toFixed(3)),
          },
          {
            label: "max",
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
            data: chartData.map(el => el.data.max.toFixed(3)),
        },
      ]
    }
  }

  return (
    <div className="chart-area">
      <Line
        data={data}
        options={chartOptions}
      />
    </div>
  )
}

export default NdviChart;