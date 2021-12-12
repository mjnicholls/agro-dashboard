const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1)

const kelvinToFahrenheit = (temp) => ((temp * 9) / 5 - 459.67).toFixed(1)

export const convertTemp = (temp, isMetric) =>
  /** Convert temperature from Kelvin to Celsius */
  isMetric ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp)

export const convertSpeed = (speed, isMetric) =>
  isMetric ? speed.toFixed(1) : (speed / 2.237).toFixed(1)

export const totalArea = (polygons) => {
  if (polygons.length) {
    const x = polygons.reduce((a, b) => ({ area: a.area + b.area }))
    return x.area.toFixed(2)
  }
  return 0
}

export const capitalize = (val) => val.charAt(0).toUpperCase() + val.slice(1)

export const getPreticipationInfo = (data) => {
  let rainStarts = null
  let rainEnds = null
  let res = 'No precipitation within the hour'

  for (let i = 0; i < data.length; i += 1) {
    if (rainStarts === null && data[i].precipitation > 0) {
      rainStarts = i
    }
    if (rainStarts !== null && data[i].precipitation === 0) {
      rainEnds = i
    }
    if (rainStarts !== null && rainEnds !== null) {
      break
    }
  }
  if (rainStarts === 0) {
    res = rainEnds
      ? `Precipitation will end within ${rainEnds - rainStarts} minute${
          rainEnds - rainStarts > 1 ? 's' : ''
        }`
      : 'Precipitation won’t end within an hour'
  } else if (rainStarts) {
    res = `Precipitation will start within ${rainStarts} minute${
      rainStarts > 1 ? 's' : ''
    }`
  }
  return res
}

export const getMapHeight = () => 'calc(100vh - 220px)'

export const numberWithCommas = (x) => {
  let res = 0
  if (x) {
    res = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  return res
}
