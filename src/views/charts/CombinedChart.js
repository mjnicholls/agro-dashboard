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
  Row
} from "reactstrap";
import classNames from "classnames";

import DatePickerFromTo from './ui/DatePickerFromTo';
import {AccumulatedChart, DailyChart, HourlyChart, HistoryWeather, SoilChart} from './'
import {getDateInPast} from "../../utils/dateTime";

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
  const [earliestPossibleDate, setEarliestPossibleDate] = useState(null);
  const limitAccPrec = useSelector(selectLimitPrec);
  const limitAccTemp = useSelector(selectLimitTemp);
  const limitSoil = useSelector(selectLimitSoil);
  const limitHistoryWeather = useSelector(selectLimitHistoryWeather);


  useEffect(() => {
    /** Set start and end date for charts taken tariff limitations into account
     *  */
    let now = new Date();
    let dateInPast = getDateInPast(1);
    setStartDate(dateInPast.getTime());
    setEndDate(now.getTime());

    let limits = [limitAccPrec.depth, limitAccTemp.depth, limitSoil.depth, limitSoil.depth];
    let earliestDate;
    let positiveLimits = limits.filter(limit => limit > 0);
    if (positiveLimits.length) {
      let limit = Math.min(...positiveLimits);
      earliestDate = new Date();
      earliestDate.setFullYear(earliestDate.getFullYear() - limit.depth);
    } else {
      earliestDate = new Date(Math.min(
        limitAccPrec.start, limitAccTemp.start, limitSoil.start, limitHistoryWeather.start) * 1000);
    }
    setEarliestPossibleDate(earliestDate)
  }, [])

  return (
    <Card className={classNames("card-chart agro-chart ", {
      "daily-chart ": onecall.data && activeTab.id === "Daily",
      "daily-chart hourly-chart": onecall.data && activeTab.id === "Hourly",
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
                    {/*<i className="tim-icons icon-single-02" />*/}
                  </span>
                </Button>)}
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
      <CardBody>
        {activeTab.calendar && <Row>
          <Col className="pb-3">
            <DatePickerFromTo
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              earliestPossibleDate={earliestPossibleDate}
            />
          </Col>
        </Row>}
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
                <SoilChart
                  polyId={polyId}
                  startDate={startDate}
                  endDate={endDate}
                /> :
          <AccumulatedChart
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
          />
        }
      </CardBody>
    </Card>
  )
}

export default CombinedChart;