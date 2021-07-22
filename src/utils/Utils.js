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