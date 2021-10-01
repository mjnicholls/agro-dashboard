import React from 'react'
import DatePicker from 'react-datetime'
import moment from 'moment/moment'

import { Col, Row } from 'reactstrap'

const DatePickerChart = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  earliestAvailableDate,
}) => {
  const onStartDateChange = (moment) => {
    setStartDate(moment.valueOf())
  }

  const onEndDateChange = (moment) => {
    setEndDate(moment.valueOf())
  }

  const validateStartDate = function (current) {
    let res = current.isBefore(endDate) && current.isBefore(moment())
    if (earliestAvailableDate) {
      res = res && current.isAfter(earliestAvailableDate)
    }
    return res
  }

  const validateEndDate = function (current) {
    return (
      current.isAfter(earliestAvailableDate) &&
      current.isAfter(startDate) &&
      current.isBefore(moment())
    )
  }

  return (
    <Row>
      <Col xs="6">
        <DatePicker
          className="agro-datepicker"
          value={startDate}
          dateFormat="DD MMM YY"
          timeFormat={false}
          onChange={onStartDateChange}
          isValidDate={validateStartDate}
          inputProps={{
            disabled: !earliestAvailableDate,
          }}
        />
      </Col>
      <Col xs="6">
        <DatePicker
          className="agro-datepicker chart-calendar-right pb-3"
          value={endDate}
          dateFormat="DD MMM YY"
          timeFormat={false}
          onChange={onEndDateChange}
          isValidDate={validateEndDate}
          inputProps={{
            disabled: !earliestAvailableDate,
          }}
        />
      </Col>
    </Row>
  )
}

export default DatePickerChart
