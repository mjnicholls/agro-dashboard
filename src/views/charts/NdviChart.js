import React, {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {Line} from "react-chartjs-2";

import DatePickerChart from './ui/DatePickerFromTo';
import {getHistoryNDVIData} from "../../services/api/chartApi";

import {toDate, getDateInPast} from '../../utils/dateTime'
import {chartOptions} from './base'

import ChartContainer from './ui/ChartContainer';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import {defaultStartHistoryWeatherCharts, tariffError} from "../../config";


const selectLimit = state => state.auth.limits.history.ndvi_history;

const NdviChart = ({ polyId }) => {

  const limit = useSelector(selectLimit);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [earliestAvailableDate, setEarliestAvailableDate] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (limit) {
      let earliestAvailableDate, startDate;
      if (limit.depth > 0) {
        earliestAvailableDate = new Date();
        earliestAvailableDate.setFullYear(earliestAvailableDate.getFullYear() - limit.depth);
        startDate = getDateInPast(Math.min(limit.depth * 12, defaultStartHistoryWeatherCharts));
      }
      else if (limit.depth < 0) {
        earliestAvailableDate = limit.start;
        startDate = getDateInPast(defaultStartHistoryWeatherCharts);
      }
      if (earliestAvailableDate) {
        setEarliestAvailableDate(earliestAvailableDate);
        setEarliestAvailableDate(earliestAvailableDate);
        setStartDate(startDate);
        setEndDate(new Date().getTime());
      } else {
        setIsLoading(false);
        setError(tariffError);
      }
    }
  }, [limit])

  useEffect(() => {
    if (startDate && endDate && polyId) {
      setIsLoading(true);
      setError(null);
      getHistoryNDVIData(polyId, startDate, endDate)
        .then(response => {
          if (response) {
            if (response.length) {
              response.reverse();
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
        .finally(() => {setIsLoading(false)})
      }
  }, [startDate, endDate, polyId])

  let chartData = (canvas) => {
    let ctx = canvas.getContext("2d");
    let gradientStrokeBlue = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStrokeBlue.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStrokeBlue.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStrokeBlue.addColorStop(0, "rgba(29,140,248,0)");

    return {
      labels: data.map(el => toDate(el.dt)),
      datasets: [
        {
          label: "Max",
          fill: "+1",
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
          data: data.map(el => el.data.max.toFixed(2)),
        },
        {
          label: "Min",
          fill: false,
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
          data: data.map(el => el.data.min.toFixed(2)),
        },
        {
          label: "Mean",
          fill: false,
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
          data: data.map(el => el.data.mean.toFixed(2)),
        }
      ]
    }
  }

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">Historical</h5>
            <CardTitle tag="h2">NDVI</CardTitle>
          </Col>
          <Col xs="6" sm="4">
            <DatePickerChart
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              earliestPossibleDate={earliestAvailableDate}
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <ChartContainer
          isLoading={isLoading}
          error={error}
          >
          <Line
            data={chartData}
            options={chartOptions} />
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

export default NdviChart;