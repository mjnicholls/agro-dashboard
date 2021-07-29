import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import ReactBSAlert from "react-bootstrap-sweetalert";
import {Line} from "react-chartjs-2";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

import {getAccumulatedData} from '../../services/api/chartApi';
import {getDateInPast, getStartDateByTariff, toDateShort} from '../../utils/dateTime';
import {chartOptions} from "./base";
import DatePickerChart from '../agro-components/DatePickerChart';
import AccumulatedInfo from '../info/AccumulatedInfo';

import {convertTemp} from '../../utils/utils';
import Slider from "nouislider";

const selectLimitPrec = state => state.auth.limits.history.weather_history_accumulated_precipitation;
const selectLimitTemp = state => state.auth.limits.history.weather_history_accumulated_temperature;
const selectUnits = state => state.units.isMetric;

const AccumulatedChart = ({id}) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);

  const limitPrec = useSelector(selectLimitPrec);
  const limitTemp = useSelector(selectLimitTemp);

  // выбрать из двух лимитов более позднюю дату
  const limit = Math.max(limitPrec, limitTemp);
  const limitStartDate = getStartDateByTariff(limit);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMetric = useSelector(selectUnits);
  const thresholdMinC = 0;
  const thresholdMinF = 32;
  const thresholdMaxC = 50;
  const thresholdMaxF = 122;

  const [threshold, setThreshold] = useState(isMetric ? thresholdMinC : thresholdMinF);

  const [rainData, setRainData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [alert, setAlert] = React.useState(null);

  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      Slider.create(sliderRef.current, {
        start: [isMetric ? thresholdMinC : thresholdMinF],
        connect: [true, false],
        step: 1,
        range: { min: isMetric ? thresholdMinC : thresholdMinF, max: isMetric ? thresholdMaxC : thresholdMaxF },
      });
    }
  }, []);

  useEffect(() => {
    let now = new Date();
    let dateInPast = getDateInPast(6);

    setStartDate(dateInPast.getTime());
    setEndDate(now.getTime());
  }, [])

  useEffect(() => {
    if (startDate && endDate && id) {
      setIsLoading(true);
      setError(null);
      getAccumulatedData(id, startDate, endDate)
        .then(res => {
          setData(res);
          setRainData(res.map(el => el.rain.toFixed(2)));
          setTempData(res.map(el => convertTemp(el.temp, isMetric)));
        })
        .catch(err => {
          if (typeof err === "object") {
            err = err.message || "Something went wrong";
          }
          setError(err)
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [startDate, endDate, id])

  useEffect(() => {
    let newData = tempData.map(el => el >= threshold ? el - threshold : 0)
    setTempData(newData)
  }, [threshold])

  useEffect(() => {
    setTempData(data.map(el => convertTemp(el.temp, isMetric)))
    setThreshold(isMetric ? thresholdMinC : thresholdMinF)
  }, [isMetric])

  const htmlAlert = () => {
    setAlert(
      <ReactBSAlert
        classname="agro-alert"
        title="Accumulated Parameters"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        <AccumulatedInfo close={hideAlert} />
        <div className="slider" ref={sliderRef} />
      </ReactBSAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

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
          beginAtZero: true,
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
          beginAtZero: true,
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
          data: tempData.map(el => el > threshold ? el - threshold : 0)
        },
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
          data: rainData,
          type: "bar"
        }
      ],
    }
  }

  return (
    <>
      {alert}
      <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Historical</h5>
            <CardTitle tag="h2">Accumulated Parameters</CardTitle>
          </Col>
          <Col sm="4">
            <DatePickerChart
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              limitStartDate={limitStartDate}
            />
          </Col>
          <Col sm="1">
            <Button className="btn-round btn-icon" color="info" onClick={htmlAlert}>
              <i className="tim-icons icon-alert-circle-exc" />
            </Button>
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
      <CardFooter>
        <hr />
        <Form className="form-horizontal">
            <Row style={{justifyContent: "flex-end"}}>
              <Label sm="3">Threshold, °{isMetric ? 'C' : 'F'}</Label>
              <Col sm="3">
                <FormGroup>
                  <Input
                    type="number"
                    value={threshold}
                    onChange={e => setThreshold(e.target.value)}
                    min={isMetric ? thresholdMinC : thresholdMinF}
                    max={isMetric ? thresholdMaxC : thresholdMaxF}
                  />
                </FormGroup>
              </Col>
            </Row>
        </Form>
      </CardFooter>
    </Card>
    </>
  )
}

export default AccumulatedChart;