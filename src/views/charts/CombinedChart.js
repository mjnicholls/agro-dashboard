import React, { useEffect, useState } from 'react'

import classNames from 'classnames'
import { useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'

import {
  AccumulatedChart,
  DailyChart,
  HourlyChart,
  HistoryWeather,
  HistorySoilChart,
} from '.'
import {
  defaultStartHistoryWeatherCharts,
  thresholdSettings,
} from '../../config'
import { getDateInPast } from '../../utils/dateTime'
import TabsSelector from '../components/TabsSelector'
import DatePickerFromTo from './ui/DatePickerFromTo'

const selectUnits = (state) => state.units.isMetric

const weatherTabs = [
  {
    id: 'Hourly',
    label: 'Hourly Forecast',
    calendar: false,
  },
  {
    id: 'Daily',
    label: 'Daily Forecast',
    calendar: false,
  },
  {
    id: 'Historical Weather',
    label: 'Historical Weather',
    calendar: true,
  },
  {
    id: 'Historical Soil',
    label: 'Historical Soil',
    calendar: true,
  },
  {
    id: 'Accumulated',
    label: 'Accumulated',
    calendar: true,
  },
]

const selectLimitPrec = (state) =>
  state.auth.limits.history.weather_history_accumulated_precipitation
const selectLimitTemp = (state) =>
  state.auth.limits.history.weather_history_accumulated_temperature
const selectLimitSoil = (state) => state.auth.limits.history.soil_history
const selectLimitHistoryWeather = (state) =>
  state.auth.limits.history.weather_history

const CombinedChart = ({ polyId, onecall }) => {
  const [activeTab, setActiveTab] = useState(weatherTabs[0])
  const isMetric = useSelector(selectUnits)

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [earliestAvailableDate, setEarliestAvailableDate] = useState(null)

  const limitAccPrec = useSelector(selectLimitPrec)
  const limitAccTemp = useSelector(selectLimitTemp)
  const limitSoil = useSelector(selectLimitSoil)
  const limitHistoryWeather = useSelector(selectLimitHistoryWeather)

  const [threshold, setThreshold] = useState(
    thresholdSettings[isMetric ? 'celsius' : 'fahrenheit'].min,
  )

  useEffect(() => {
    setThreshold(thresholdSettings[isMetric ? 'celsius' : 'fahrenheit'].min)
  }, [isMetric])

  useEffect(() => {
    /** Set start and end date for charts based on tariff and api limits
     * Consider limits for
     * - accumulated temperature
     * - accumulated precipitation
     * - history soil
     * - history weather data
     * LimitsApi come from backend as:
     * -1: unlimited
     * 0: not available for this tariff
     * int - number in years
     *  */
    let depth
    let newStartDate
    let newEarliestAvailableDate
    const depths = [
      limitAccPrec.depth,
      limitAccTemp.depth,
      limitSoil.depth,
      limitSoil.depth,
    ]
    const positiveDepths = depths.filter((el) => el >= 0)
    if (positiveDepths.length) {
      depth = Math.min(...positiveDepths)
    } else {
      depth = -1
    }
    if (depth && depth > 0) {
      // limited data is available
      newEarliestAvailableDate = new Date()
      newEarliestAvailableDate.setMonth(
        newEarliestAvailableDate.getMonth() - depth * 12,
      )
      // set default start date from config unless earliestAvailableDate is later
      newStartDate = getDateInPast(
        Math.min(depth * 12, defaultStartHistoryWeatherCharts),
      )
    } else if (depth < 0) {
      newEarliestAvailableDate = new Date(
        Math.min(
          limitAccPrec.start,
          limitAccTemp.start,
          limitSoil.start,
          limitHistoryWeather.start,
        ) * 1000,
      )
      newStartDate = getDateInPast(defaultStartHistoryWeatherCharts) // один месяц назад
    }
    if (newEarliestAvailableDate) {
      setEarliestAvailableDate(newEarliestAvailableDate)
      if (newStartDate) {
        setStartDate(newStartDate.getTime())
        setEndDate(new Date().getTime() - 5000) // 5 seconds lead time for the back-end
      }
    }
  }, [limitAccPrec, limitAccTemp, limitSoil, limitHistoryWeather, polyId])

  const returnTabContent = (tabId) => {
    switch (tabId) {
      case 'Hourly':
        return <HourlyChart isMetric={isMetric} onecall={onecall} />
      case 'Daily':
        return <DailyChart isMetric={isMetric} onecall={onecall} />
      case 'Historical Weather':
        return (
          <HistoryWeather
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
            earliestAvailableDate={limitHistoryWeather.start * 1000}
          />
        )
      case 'Historical Soil':
        return (
          <HistorySoilChart
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
            earliestAvailableDate={limitSoil.start * 1000}
          />
        )
      default:
        return (
          <AccumulatedChart
            polyId={polyId}
            startDate={startDate}
            endDate={endDate}
            threshold={threshold}
            earliestAvailableDate={
              Math.min(limitAccPrec.start, limitAccTemp.start) * 1000
            }
          />
        )
    }
  }

  return (
    <Card
      className={classNames('card-chart agro-chart ', {
        'daily-chart ': onecall.data && activeTab.id === 'Daily',
        'daily-chart hourly-chart': onecall.data && activeTab.id === 'Hourly',
        'accumulated-chart': onecall.data && activeTab.id === 'Accumulated',
      })}
    >
      <CardHeader>
        <Row>
          <Col className="text-left" xs="6" md="4">
            <h5 className="card-category">{activeTab.label.split(' ')[0]}</h5>
            <CardTitle tag="h2">
              {activeTab.label.split(' ').slice(1).join(' ')}
            </CardTitle>
          </Col>
          <Col xs="6" md="8">
            <TabsSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              options={weatherTabs}
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        {activeTab.calendar && (
          <Row className="justify-content-end align-items-center">
            {activeTab.id === 'Accumulated' && earliestAvailableDate && (
              <>
                <Label>Threshold, °{isMetric ? 'C' : 'F'}</Label>
                <Col xs="4" sm="3" md="2">
                  <FormGroup>
                    <Input
                      type="number"
                      value={threshold}
                      onChange={(e) => setThreshold(e.target.value)}
                      min={
                        thresholdSettings[isMetric ? 'celsius' : 'fahrenheit']
                          .min
                      }
                      max={
                        thresholdSettings[isMetric ? 'celsius' : 'fahrenheit']
                          .max
                      }
                    />
                  </FormGroup>
                </Col>
              </>
            )}
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
        )}
        {returnTabContent(activeTab.id)}
      </CardBody>
    </Card>
  )
}

export default CombinedChart
