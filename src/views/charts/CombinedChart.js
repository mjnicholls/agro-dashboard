import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
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
import TabsSelector from './ui/TabsSelector';

const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const weatherTabs = [
  {
    id: "Hourly",
    label: "Hourly Forecast",
    calendar: false,
  },
  {
    id: "Daily",
    label: "Daily Forecast",
    calendar: false,
  },
  {
    id: "Historical Weather",
    label: "Historical Weather Data",
    calendar: true,
  },
  {
    id: "Historical Soil",
    label: "Historical Soil Data",
    calendar: true,
  },
  {
    id: "Accumulated",
    label: "Accumulated Parameters",
    calendar: true,
  }
]

const selectLimitPrec = state => state.auth.limits.history.weather_history_accumulated_precipitation;
const selectLimitTemp = state => state.auth.limits.history.weather_history_accumulated_temperature;
const selectLimitSoil = state => state.auth.limits.history.soil_history;
const selectLimitHistoryWeather = state => state.auth.limits.history.weather_history;

const CombinedChart = ({polyId}) => {

  const [activeTab, setActiveTab] = useState(weatherTabs[0]);
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
     * Limits come from backend as:
     * -1: unlimited
     * 0: not available for this tariff
     * int - number in years
     *  */

    let depth, startDate, earliestAvailableDate;
    let depths = [limitAccPrec.depth, limitAccTemp.depth, limitSoil.depth, limitSoil.depth];
    let positiveDepths = depths.filter(el => el >= 0);
    if (positiveDepths.length) {
      depth = Math.min(...positiveDepths)
    } else {
      depth = -1;
    }
    if (depth && depth > 0 ) {
      // limited data is available
      earliestAvailableDate = new Date();
      earliestAvailableDate.setMonth(earliestAvailableDate.getMonth() - depth * 12);
      // set default start date from config unless earliestAvailableDate is later
      startDate = getDateInPast(Math.min(depth * 12, defaultStartHistoryWeatherCharts));

    } else if (depth < 0) {
      earliestAvailableDate = new Date(Math.min(
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
            <Col className="text-left" xs="6" md="4">
              <h5 className="card-category">{activeTab.label.split(" ")[0]}</h5>
              <CardTitle tag="h2">{activeTab.label.split(" ").slice(1).join(" ")}</CardTitle>
            </Col>
            <Col xs="6" md="8">
              <TabsSelector
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                options={weatherTabs} />
            </Col>
          </Row>
        </CardHeader>
      <CardBody>
        {activeTab.calendar &&
        <Row className="justify-content-end align-items-center">
          {(activeTab.id === "Accumulated" && earliestAvailableDate) &&
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
            : (activeTab.id === "Historical Weather") ?
              <HistoryWeather
                polyId={polyId}
                startDate={startDate}
                endDate={endDate}
                earliestAvailableDate={limitHistoryWeather.start * 1000}
              />
              : (activeTab.id === "Historical Soil") ?
                <HistorySoilChart
                  polyId={polyId}
                  startDate={startDate}
                  endDate={endDate}
                  earliestAvailableDate={limitSoil.start  * 1000}
                /> :
          <AccumulatedChart
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
            threshold={threshold}
            earliestAvailableDate={Math.min(limitAccPrec.start, limitAccTemp.start) * 1000 }
          />
        }
      </CardBody>
    </Card>
  )
}

export default CombinedChart;