import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {getSoilData} from "../../services/api/chartApi";
import {getStartDateByTariff, toDateShort} from '../../utils/DateTime'
import {Line} from "react-chartjs-2";
import {chartOptions} from './base';
import DatePickerChart from '../agro-components/DatePickerChart';
import {kelvinToCelsius} from '../../utils/Utils';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


const selectLimit = state => state.auth.limits.history.soil_history;

const SoilChart = ({ id, defaultStartDate, defaultEndDate }) => {

  const limit = useSelector(selectLimit);
  const limitStartDate = getStartDateByTariff(limit);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  React.useEffect(() => {
    setIsLoading(true);
    if (startDate && endDate && id) {
      getSoilData(id, startDate, endDate)
        .then(response => {
          if (response) {
            if (response.length) {
              setData(response)
            } else {
              setError("No data for selected period");
            }
          } else {
            setError("Failed to fetch data");
          }
        })
        .catch(err => {
          if (typeof err === "object") {
            err = err.message || "Something went wrong";
          }
          setError(err);
        })
        .finally(() => {setIsLoading(false)})
    }
  }, [startDate, endDate, id])

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
          callback: function (value) {
            return value + '°';
          }
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

  let chartData = (canvas) => {

    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    let gradientStrokeGreen = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeGreen.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStrokeGreen.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStrokeGreen.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    let gradientStrokePurple = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStrokePurple.addColorStop(1, "rgba(72,72,176,0.4)");
    gradientStrokePurple.addColorStop(0.8, "rgba(72,72,176,0.2)");
    gradientStrokePurple.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: data.map(el => toDateShort(el.dt)),
      datasets: [
        {
            label: "Soil temperature at a depth of 10cm",
            yAxisID: "temperature",
            fill: false,
            // backgroundColor: gradientStrokeBlue,
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
            pointRadius: 1,
            data: data.map(el => kelvinToCelsius(el.t10)),
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
            pointRadius: 1,
            data: data.map(el => el.moisture.toFixed(3)),
          },
          {
            label: "Soil temperature at the surface",
            yAxisID: "temperature",
            fill: false,
            // backgroundColor: gradientStrokeBlue,
            borderColor: "#ba54f5",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "#ba54f5",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#ba54f5",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 1,
            data: data.map(el => kelvinToCelsius(el.t0)),
        },
      ]
    }
  }

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Historical</h5>
            <CardTitle tag="h2">Soil data</CardTitle>
          </Col>
          <Col xs="6" sm="4">
            <DatePickerChart
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              limitStartDate={limitStartDate}
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {isLoading ?
            <div className="chart-placeholder">Fetching data...</div> :
            error ?
              <div className="chart-placeholder">{error}</div>  :
              data.length ?
              <div className="chart-area">
                <Line
                  data={chartData}
                  options={options}
                />
              </div> : null
          }
      </CardBody>
    </Card>
  )
}

export default SoilChart;