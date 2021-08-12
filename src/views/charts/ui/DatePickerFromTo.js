import React from 'react';
import DatePicker from "react-datetime";
import moment from "moment/moment";

const DatePickerChart = ({startDate, setStartDate, endDate, setEndDate, earliestPossibleDate: earliestAvailableDate}) => {

  const onStartDateChange = (moment) => {
    setStartDate(moment.valueOf());
  }

  const onEndDateChange = (moment) => {
    setEndDate(moment.valueOf());
  }

   let validateStartDate = function( current ){
    let res = current.isBefore(endDate) && current.isBefore(moment());
    if (earliestAvailableDate) {
      res = res && current.isAfter(earliestAvailableDate)
    }
    return  res ;
  };

  let validateEndDate = function( current ){
    return current.isAfter(earliestAvailableDate) && current.isAfter(startDate) && current.isBefore(moment());
  };

  return (
    <div className="datepicker-container">
      <DatePicker
        className="card-header-calendar"
        value={startDate}
        dateFormat={"DD MMM YY"}
        timeFormat={false}
        onChange={onStartDateChange}
        isValidDate={validateStartDate}
        inputProps={{
          disabled: !earliestAvailableDate
        }}
     />
      <DatePicker
        className="card-header-calendar chart-calendar-right pb-3"
        value={endDate}
        dateFormat={"DD MMM YY"}
        timeFormat={false}
        onChange={onEndDateChange}
        isValidDate={validateEndDate}
        inputProps={{
          disabled: !earliestAvailableDate
        }}
      />
    </div>
  )
}

export default DatePickerChart;