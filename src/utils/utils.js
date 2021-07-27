export const kelvinToCelsius = (temp) => {
  return Math.round(temp - 273.15)
}

export const totalArea = (polygons) => {
  if (polygons.length) {
    let x = polygons.reduce((a,b) => ({area: a.area + b.area}))
    return x.area.toFixed(2)
  }
  return 0
}

export const capitalize = (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1)
}


export const getPreticipationInfo = data => {
  let rainStarts = null;
  let rainEnds = null;
  let res = 'No precipitation within teh hour';

  for (let i = 0; i < data.length; i++) {
    if (rainStarts === null && data[i].precipitation > 0) {
      rainStarts = i;
    }
    if (rainStarts !== null && data[i].precipitation === 0) {
      rainEnds = i;
    }
    if (rainStarts !== null && rainEnds !== null) {
      break;
    }
  }
  if (rainStarts === 0) {
    res = rainEnds
      ? `Precipitation will end within ${rainEnds - rainStarts} minute${
          rainEnds - rainStarts > 1 ? 's' : ''
        }`
      : 'Precipitation won’t end within an hour';
  } else if (rainStarts) {
    res = `Precipitation will start within ${rainStarts} minute${
      rainStarts > 1 ? 's' : ''
    }`;
  }
  return res;
};
