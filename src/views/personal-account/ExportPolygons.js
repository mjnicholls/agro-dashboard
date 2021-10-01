/* eslint-disable */
import React from 'react'

import { Button } from 'reactstrap'

const ExportPolygons = () => {
  const data = {
    exceeding_area_limit: 718.54,
    full_area: 1718.54,
    message: 'The allowed area limit for your tariff has been exceeded',
    permissible_area: 1000,
    polygons: [
      {
        area: 190.9484,
        created_at: 1624362079,
        deleted_at: null,
        name: "Polygon '1",
        poly_id: '60dcc5f380af33b546b26be',
        source: null,
      },
      {
        area: 190.9484,
        created_at: 1624546610,
        deleted_at: null,
        name: 'Polygon, 2',
        poly_id: '60d49d28f735b8253e343b2',
        source: null,
      },
    ],
  }

  const jsonToCsv = (data) => {
    // var array = typeof objArray != 'object' ? JSON.parse(data.polygons) : data.polygons;
    const array = data.polygons
    let str = ''
    var line = ''
    // header
    const head = array[0]
    for (var index in head) {
      var value = `${index}`
      line += `"${value.replace(/"/g, '""')}",`
    }
    line = line.slice(0, -1)
    str += `${line}\r\n`

    // data
    for (let i = 0; i < array.length; i++) {
      var line = ''
      for (var index in array[i]) {
        var value = array[i][index]
        value = value ? `${value}` : ''
        line += `"${value.replace(/"/g, '""')}",`
      }
      line = line.slice(0, -1)
      str += `${line}\r\n`
    }
    return str
  }

  const startDownload = () => {
    const convertedData = jsonToCsv(data)
    const blob = new Blob([convertedData], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'polygons.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button
      onClick={startDownload}
      className="btn-fill"
      color="primary"
      data-dismiss="modal"
      type="button"
      title="Export polygons"
    >
      Export polygons
    </Button>
  )
}

export default ExportPolygons
