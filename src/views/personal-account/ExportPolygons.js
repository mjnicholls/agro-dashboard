import React, { useEffect, useState } from 'react'

import { Button } from 'reactstrap'

import { getPolygons } from '../../services/api/personalAccountAPI'

const ExportPolygon = () => {
  const [polygons, setPolygons] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getPolygons()
      .then((res) => {
        setPolygons(res.polygons)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const arrayToCSV = (polygons) => {
    let res = ''

    let header = [
      'Name',
      'Polygon ID',
      'Source',
      'Created At',
      'Deleted At',
      'Area',
    ]

    if (polygons.length) {
      let csv = polygons.map(
        (polygons) =>
          `"${polygons.name}","${polygons.poly_id}","${
            polygons.source
          }","${polygons.created_at.slice(0, 11)}","${
            polygons.deleted_at? polygons.deleted_at.slice(0, 11) : ''
          }","${polygons.area}"`,
      )
      csv.unshift(header + '')
      res = `${csv.join('\n').replace(/','/g, '","')}`
    } else {
      return header
    }

    return res
  }

  const downLoad = () => {
    const polygonData = arrayToCSV(polygons)
    const blob = new Blob([polygonData], { type: 'text/csv' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'polygons.csv'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button
      className="btn-neutral"
      color="default"
      data-dismiss="modal"
      type="button"
      onClick={downLoad}
    >
      Export
    </Button>
  )
}

export default ExportPolygon
