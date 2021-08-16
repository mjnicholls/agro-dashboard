import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import classNames from "classnames";

import DatePickerFromTo from './ui/DatePickerFromTo';
import {AccumulatedChart, DailyChart, HourlyChart, HistoryWeather, HistorySoilChart} from './'
import {getDateInPast} from "../../utils/dateTime";
import {defaultStartHistoryWeatherCharts, treshold} from "../../config";
import {convertTemp} from "../../utils/utils";

const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const tabsConfig = {
    Hourly: {
      id: "Hourly",
      label: "Forecast",
      name: "Hourly",
      calendar: false,
      short: "H"
    },
    Daily: {
      id: "Daily",
      label: "Forecast",
      name: "Daily",
      calendar: false,
      short: "D"
    },
    "History Weather": {
      id: "History Weather",
      label: "Historical",
      name: "Weather Data",
      calendar: true,
      short: "HW"
    },
    "History Soil": {
      id: "History Soil",
      label: "Historical",
      name: "Soil Data",
      calendar: true,
      short: "S"
    },
    Accumulated: {
      id: "Accumulated",
      label: "Accumulated",
      name: "Parameters",
      calendar: true,
      short: "A"
    }
  }

const selectLimitPrec = state => state.auth.limits.history.weather_history_accumulated_precipitation;
const selectLimitTemp = state => state.auth.limits.history.weather_history_accumulated_temperature;
const selectLimitSoil = state => state.auth.limits.history.soil_history;
const selectLimitHistoryWeather = state => state.auth.limits.history.weather_history;

const CombinedChart = ({polyId}) => {

  const [activeTab, setActiveTab] = useState(tabsConfig.Hourly);
  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [earliestAvailableDate, setEarliestAvailableDate] = useState(null);

  const limitAccPrec = useSelector(selectLimitPrec);
  const limitAccTemp = useSelector(selectLimitTemp);
  const limitSoil = useSelector(selectLimitSoil);
  const limitHistoryWeather = useSelector(selectLimitHistoryWeather);

  const [threshold, setThreshold] = useState(treshold[isMetric ? "celsius" : "fahrenheit"].min);
  useEffect(() => {
    setThreshold(treshold[isMetric ? "celsius" : "fahrenheit"].min)
  }, [isMetric])

  useEffect(() => {
    /** Set start and end date for charts based on tariff and api limits
     * Consider limits for
     * - accumulated temperature
     * - accumulated precipitation
     * - history soil
     * - history weather data
     *  */

    let depth, startDate, earliestAvailableDate;
    // limits come from backend as
    // -1: unlimited, 0: not available for this tariff, > 0 - number in years
    let depths = [limitAccPrec.depth, limitAccTemp.depth, limitSoil.depth, limitSoil.depth];
    let positiveDepths = depths.filter(el => el >= 0);
    if (positiveDepths.length) {
      depth = Math.min(...positiveDepths)
    }
    if (depth && depth > 0 ) {
      // tariffs small, starter
      earliestAvailableDate = new Date();
      earliestAvailableDate.setFullYear(earliestAvailableDate.getFullYear() - depth);
      // set default start date from config unless earliestAvailableDate is later

      startDate = getDateInPast(Math.min(depth * 12, defaultStartHistoryWeatherCharts));

    } else if (depth < 0) {
      // tarrif corp // TODO выбираю максимальную дату, нет возможности увидеть более ранние даты
      earliestAvailableDate = new Date(Math.max(
        limitAccPrec.start, limitAccTemp.start, limitSoil.start, limitHistoryWeather.start) * 1000);
      startDate = getDateInPast(defaultStartHistoryWeatherCharts); // один месяц назад
    }
    if (earliestAvailableDate) {
      setEarliestAvailableDate(earliestAvailableDate)
      if (startDate) {
        setStartDate(startDate.getTime());
        setEndDate(new Date().getTime());
      }
    }
  }, [limitAccPrec, limitAccTemp, limitSoil, limitHistoryWeather, polyId])

  return (
    <Card className={classNames("card-chart agro-chart ", {
      "daily-chart ": onecall.data && activeTab.id === "Daily",
      "daily-chart hourly-chart": onecall.data && activeTab.id === "Hourly",
      "accumulated-chart": onecall.data && activeTab.id === "Accumulated"
    })}>
        <CardHeader>
          <Row>
            <Col className="text-left" xs="4">
              <h5 className="card-category">{activeTab.label}</h5>
              <CardTitle tag="h2">{activeTab.name}</CardTitle>
            </Col>
            <Col xs="8">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
              >
                {Object.entries(tabsConfig).map((tab, index) => <Button
                  color="github" id={index} size="sm" tag="label" key={tab}
                  className={classNames("btn-simple", {
                    active: activeTab.id === tab[0],
                  })}
                  onClick={() => setActiveTab(tab[1])}
                  style={{padding: "5px 10px"}}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    {tab[0]}
                  </span>
                  <span className="d-block d-sm-none">
                    {tab[1].short}
                  </span>
                </Button>)}
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
      <CardBody>
        {activeTab.calendar &&
        <Row className="justify-content-end align-items-center">
          {activeTab.id === "Accumulated" &&
            <>
            <Label >Threshold, °{isMetric ? 'C' : 'F'}</Label>
            <Col xs="4" sm="3" md="2" >
                <FormGroup>
                  <Input
                    type="number"
                    value={threshold}
                    onChange={e => setThreshold(e.target.value)}
                    min={treshold[isMetric ? "celsius" : "fahrenheit"].min}
                    max={treshold[isMetric ? "celsius" : "fahrenheit"].max}
                  />
                </FormGroup>
            </Col>
              </>
            }
            <Col xs="8" sm="6" md="4">
              <DatePickerFromTo
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                earliestAvailableDate={earliestAvailableDate}
              />
            </Col>
          </Row>
          }
        {(activeTab.id === "Hourly") ?
          <HourlyChart isMetric={isMetric} onecall={onecall}/>
          : (activeTab.id === "Daily") ?
            <DailyChart isMetric={isMetric} onecall={onecall} />
            : (activeTab.id === "History Weather") ?
              <HistoryWeather
                polyId={polyId}
                startDate={startDate}
                endDate={endDate}
              />
              : (activeTab.id === "History Soil") ?
                <HistorySoilChart
                  polyId={polyId}
                  startDate={startDate}
                  endDate={endDate}
                /> :
          <AccumulatedChart
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
            threshold={threshold}
          />
        }
      </CardBody>
    </Card>
  )
}

export default CombinedChart;