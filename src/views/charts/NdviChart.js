import React from 'react';

import {useSelector} from 'react-redux';
import moment from 'moment';
import DatePicker from "react-datetime";
import {Line} from "react-chartjs-2";


import {getNDVIData} from "../../services/api/polygonApi";
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
  let [limitStartDate, setLimitStartDate] = React.useState(null);
  let [startDate, setStartDate] = React.useState(defaultStartDate  * 1000);
  let [endDate, setEndDate] = React.useState(defaultEndDate * 1000);
  let [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    setLimitStartDate(getStartDateByTariff(limit))
  }, [])

  React.useEffect(() => {
    if (startDate && endDate) {
      getNDVIData(id, Math.round(startDate / 1000), Math.round(endDate/1000))
        .then(response => {
          if (response && response.length) {
            response.reverse()
            setChartData(response)
          }
        })
      }
  }, [startDate, endDate])

  const onStartDateChange = (moment) => {
    setStartDate(moment.unix())
  }

  const onEndDateChange = (moment) => {
    setEndDate(moment.unix())
  }

  var validateStartDate = function( current ){
    return current.isAfter(limitStartDate) && current.isBefore( endDate ) && current.isBefore(moment());
  };

  var validateEndDate = function( current ){
    return current.isAfter(limitStartDate) && current.isAfter( startDate ) && current.isBefore(moment());
  };

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
          <Col className="text-left" sm="6">
            <h5 className="card-category">History</h5>
            <CardTitle tag="h2">NDVI</CardTitle>
          </Col>
          <Col sm="6">
            <Row style={{justifyContent: 'flex-end'}}>
              <Col lg="5" md="6" sm="3">
                <DatePicker
                  className="card-header-calender"
                  value={startDate }
                  dateFormat={"DD MMM YY"}
                  timeFormat={false}
                  onChange={onStartDateChange}
                  isValidDate={validateStartDate}
               />
              </Col>
              <Col lg="5" md="6" sm="3">
                <DatePicker
                  className="card-header-calender chart-calender-right"
                  value={endDate }
                  dateFormat={"DD MMM YY"}
                  timeFormat={false}
                  onChange={onEndDateChange}
                  isValidDate={validateEndDate}
                />
              </Col>
            </Row>
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