import React from 'react';

import {useSelector} from 'react-redux';
import moment from 'moment';
import {Line} from "react-chartjs-2";
import DatePickerChart from '../agro-components/DatePickerChart';

import {getNDVIData} from "../../services/api/chartApi";
import {toDate, getStartDateByTariff} from '../../utils/DateTime'
import {chartOptions} from './base'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const selectLimit = state => state.auth.limits.history.ndvi_history;

const NdviChart = ({ id, defaultStartDate, defaultEndDate }) => {

  const limit = useSelector(selectLimit);
  const limitStartDate = getStartDateByTariff(limit);

  let [startDate, setStartDate] = React.useState(defaultStartDate);
  let [endDate, setEndDate] = React.useState(defaultEndDate);
  let [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    if (startDate && endDate) {
      getNDVIData(id, startDate, endDate)
        .then(response => {
          if (response && response.length) {
            response.reverse();
            setChartData(response);
          }
        })
      }
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
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" sm="8">
            <h5 className="card-category">History</h5>
            <CardTitle tag="h2">NDVI</CardTitle>
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
        <div className="chart-area">
          <Line
            data={data}
            options={chartOptions}
          />
        </div>
      </CardBody>
    </Card>
  )
}

export default NdviChart;