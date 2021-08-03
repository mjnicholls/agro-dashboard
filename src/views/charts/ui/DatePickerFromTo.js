import React from 'react';
import DatePicker from "react-datetime";
import moment from "moment/moment";

const DatePickerChart = ({startDate, setStartDate, endDate, setEndDate, limitStartDate }) => {

  const onStartDateChange = (moment) => {
    setStartDate(moment.valueOf());
  }

  const onEndDateChange = (moment) => {
    setEndDate(moment.valueOf());
  }

   let validateStartDate = function( current ){
    let res = current.isBefore(endDate) && current.isBefore(moment());
    if (limitStartDate) {
      res = res && current.isAfter(limitStartDate)
    }
    return  res ;
  };

  let validateEndDate = function( current ){
    return current.isAfter(limitStartDate) && current.isAfter(startDate) && current.isBefore(moment());
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
     />
      <DatePicker
        className="card-header-calendar chart-calendar-right"
        value={endDate}
        dateFormat={"DD MMM YY"}
        timeFormat={false}
        onChange={onEndDateChange}
        isValidDate={validateEndDate}
      />
    </div>
  )
}

export default DatePickerChart;