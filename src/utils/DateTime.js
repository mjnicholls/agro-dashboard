

export const toDate = (ts) => {
  const formatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
  let date = new Date(ts * 1000);
  return date.toLocaleString('en-US', formatOptions)
}

export const toDateShort = (ts) => {
  const formatOptions = { day: 'numeric', month: 'short' }
  let date = new Date(ts * 1000);
  return date.toLocaleString('en-US', formatOptions)
}

export const getStartDateByTariff = (limit) => {
  /** Get start date based on client's tariff
   * depth = -1: unlimited
   * depth = 1: 1 year
   * depth = 0.5: 1/2 year
   * */
  let newStartDate;
  if (limit.depth > 0) {
    // depth is defined in years
    newStartDate = new Date();
    newStartDate.setFullYear(newStartDate.getFullYear() - 0.8);
  } else {
    // if the depth is unlimited take the earliest possible date
    newStartDate = limit.start;
  }
  return newStartDate;
}