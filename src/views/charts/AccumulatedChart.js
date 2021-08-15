import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';

import ReactBSAlert from "react-bootstrap-sweetalert";
import Slider from "nouislider";
import {Line} from "react-chartjs-2";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";

import AccumulatedInfo from '../info/AccumulatedInfo';
import ChartContainer from './ui/ChartContainer';
import {getAccumulatedData} from '../../services/api/chartApi';
import {toDateShort} from '../../utils/dateTime';
import {chartOptions} from "./base";
import {convertTemp} from '../../utils/utils';
import {tariffError} from "../../config";

const selectUnits = state => state.units.isMetric;

const AccumulatedChart = ({polyId, startDate, endDate}) => {

  const [data, setData] = useState([]);

  const [error, setError] = useState(startDate ? null : tariffError);
  const [isLoading, setIsLoading] = useState(startDate);

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
    if (startDate && endDate && polyId) {
      setIsLoading(true);
      setError(null);
      getAccumulatedData(polyId, startDate, endDate)
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
  }, [startDate, endDate, polyId])

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
        customClass="agro-alert"
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
        maxTicksLimit: 6,
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
        maxTicksLimit: 6,
        beginAtZero: true,
        fontColor: "#9a9a9a",
        callback: function (value) {
          return value + ' mm';
        }
      }
    }
  ]
  options.tooltips = {
    ...options.tooltips,
    callbacks: {
      label: function(tooltipItem, data) {
        return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.value + ( tooltipItem.datasetIndex  ? 'mm' : '°');
        }
    }
  }

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
     <div style={{position: "relative"}}>
        <ChartContainer
          isLoading={isLoading}
          error={error}
        >
          <Line data={chartData} options={options} />
          {/*<hr />*/}
          <Form className="form-horizontal my-0" style={{position: "absolute", top: 0, left: 60}}>
            {/*<Row>*/}
              {/*<FormGroup className={`has-label ${loginFullNameState}`}>*/}
                    {/*<label>Full Name *</label>*/}
                    {/*<Input*/}
                      {/*name="fullname"*/}
                      {/*type="text"*/}
                      {/*onChange={(e) => change(e, "loginFullName", "length", 1)}*/}
                    {/*/>*/}
                    {/*{loginFullNameState === "has-danger" ? (*/}
                      {/*<label className="error">This field is required.</label>*/}
                    {/*) : null}*/}
                  {/*</FormGroup>*/}

              <FormGroup>
                <Label>Threshold, °{isMetric ? 'C' : 'F'}</Label>
                <Input
                  type="number"
                  value={threshold}
                  onChange={e => setThreshold(e.target.value)}
                  min={isMetric ? thresholdMinC : thresholdMinF}
                  max={isMetric ? thresholdMaxC : thresholdMaxF}
                />
              </FormGroup>
            {/*</Row>*/}

            {/*<Row style={{justifyContent: "flex-end"}}>*/}
              {/*<Label sm="3">Threshold, °{isMetric ? 'C' : 'F'}</Label>*/}
              {/*<Col sm="3">*/}
                {/*<FormGroup>*/}
                  {/*<Input*/}
                    {/*type="number"*/}
                    {/*value={threshold}*/}
                    {/*onChange={e => setThreshold(e.target.value)}*/}
                    {/*min={isMetric ? thresholdMinC : thresholdMinF}*/}
                    {/*max={isMetric ? thresholdMaxC : thresholdMaxF}*/}
                  {/*/>*/}
                {/*</FormGroup>*/}
              {/*</Col>*/}
            {/*</Row>*/}
          </Form>
        </ChartContainer>
       </div>
  )
}

export default AccumulatedChart;