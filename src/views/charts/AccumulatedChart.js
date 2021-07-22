import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getAccumulatedData} from '../../services/api/chartApi';
import {getDateInPast, getStartDateByTariff, toDateShort} from '../../utils/dateTime';
import {Line} from "react-chartjs-2";
import {chartOptions} from "./base";
import DatePickerChart from '../agro-components/DatePickerChart';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";


// TODO 2 разных лимита: температура и осадки
const selectLimit = state => state.auth.limits.history.weather_history_accumulated_precipitation;
// const selectLimit = state => state.auth.limits.history.weather_history_accumulated_temperature;

const AccumulatedChart = ({id}) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  const limit = useSelector(selectLimit);
  const limitStartDate = getStartDateByTariff(limit);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [treshold, setTreshold] = useState(50);


  useEffect(() => {
    let now = new Date();
    let dateInPast = getDateInPast(6);

    setStartDate(dateInPast.getTime());
    setEndDate(now.getTime());

  }, [])

  useEffect(() => {
    if (startDate && endDate && id) {
      setIsLoading(true);
      getAccumulatedData(id, startDate, endDate)
        .then(res => {
          setData(res);
        })
        .catch(err => {
          setError(err)
        })
        .finally(() => {
          setIsLoading(false);
        })
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
        id: "rainfall",
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
            return value + ' mm';
          }
        }
      }
  ]

  const chartData = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)");

    return {
      labels: data.map(el => toDateShort(el.dt)),
      datasets: [
        {
          label: "Rainfall",
          yAxisID: "rainfall",
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
          pointRadius: 1,
          data: data.map(el => el.rain)
        },
        {
          label: "Temperature",
          yAxisID: "temperature",
          fill: false,
          borderColor: "#be55ed",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#be55ed",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#be55ed",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 1,
          data: data.map(el => el.temp)
        }
      ],
    }
  }

  return ( <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Historical</h5>
            <CardTitle tag="h2">Accumulated Parameters</CardTitle>
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

export default AccumulatedChart;