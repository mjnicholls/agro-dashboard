import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import {toDateShort, getDateInPast, getStartDateByTariff, toDate} from "../../utils/dateTime";
import {kelvinToCelsius} from '../../utils/utils'
import DatePickerChart from "../agro-components/DatePickerChart";

import {Line} from "react-chartjs-2";
import {chartOptions} from "./base";
import {getHistoryWeatherData} from "../../services/api/chartApi";


const selectLimit = state => state.auth.limits.history.weather_history;


const HistoryWeather = ({polygonId}) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  const limit = useSelector(selectLimit);
  const limitStartDate = getStartDateByTariff(limit);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let now = new Date();
    let dateInPast = getDateInPast(1);
    setStartDate(dateInPast.getTime());
    setEndDate(now.getTime());
  }, [])

  useEffect(() => {
    if (startDate && endDate) {
      getHistoryWeatherData(polygonId, startDate, endDate)
        .then(response => {
          console.log(response)
          if (response) {
            if (response.length) {
              setData(response);
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
        .finally(() => {
        setIsLoading(false);
      })
    }
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
          callback: function (value) {
            return value + '°';
          }
        },
      },
      {
        id: "precipitation",
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
          callback: function (value) {
            return value + 'mm';
          }
        },
      }
  ]

  let chartData = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    let gradientStrokePurple = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStrokePurple.addColorStop(1, "rgba(72,72,176,0.4)");
    gradientStrokePurple.addColorStop(0.8, "rgba(72,72,176,0.2)");
    gradientStrokePurple.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    const purple = "#ba54f5";
    const blue = "#1f8ef1";

    let minTemp = [];
    let maxTemp = [];
    let labels = [];
    let rainData = [];
    for (let i=0; i<data.length; i++) {
      let el = data[i];
      minTemp.push(kelvinToCelsius(el.main.temp_min));
      maxTemp.push(kelvinToCelsius(el.main.temp_max));
      labels.push(toDateShort(el.dt)); // TODO local date
      let prec = 0 + (el.rain ? el.rain["1h"] || 0 : 0) + (el.snow ? el.snow["1h"] || 0 : 0);
      rainData.push(prec.toFixed(2));
    }

    return ({
      labels: labels,
      datasets: [
        {
          label: "Maximum temperature",
          yAxisID: "temperature",
          fill: '+1',
          backgroundColor: gradientStrokePurple,
          borderColor: purple,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: purple,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: purple,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: maxTemp,
          tension: 0.1
        },
        {
          label: "Minimum temperature",
          yAxisID: "temperature",
          fill: false,
          // backgroundColor: gradientStrokeGreen,
          borderColor: purple,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: purple,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: purple,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: minTemp,
          tension: 0.1
        },
        {
          label: "Precipitation",
          yAxisID: "precipitation",
          fill: true,
          backgroundColor: gradientStrokeBlue,
          borderColor: blue,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: blue,
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: blue,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: rainData,
          tension: 0.1
        }
      ]
    })
  }


  return ( <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Historical</h5>
            <CardTitle tag="h2">Weather data</CardTitle>
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
    </Card>)


}

export default HistoryWeather;