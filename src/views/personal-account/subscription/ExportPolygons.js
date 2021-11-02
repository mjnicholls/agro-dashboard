import React, { useEffect, useState } from 'react'

import { Button } from 'reactstrap'

import { getPolygons } from '../../../api/personalAccount'

const ExportPolygon = () => {
  const [polygons, setPolygons] = useState([])

  useEffect(() => {
    getPolygons()
      .then((res) => {
        setPolygons(res.polygons)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }, [])

  const arrayToCSV = (data) => {
    const header = [
      'Name',
      'Polygon ID',
      'Source',
      'Created At',
      'Deleted At',
      'Area',
    ]

    if (data.length) {
      const csv = data.map(
        (polygon) =>
          `"${polygon.name}","${polygon.poly_id}","${
            polygon.source
          }","${polygon.created_at.slice(0, 11)}","${
            polygon.deleted_at ? polygon.deleted_at.slice(0, 11) : ''
          }","${polygon.area}"`,
      )
      csv.unshift(`${header}`)
      return `${csv.join('\n').replace(/','/g, '","')}`
    }
    return header
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
      className="btn-primary"
      color="default"
      data-dismiss="modal"
      type="button"
      onClick={downLoad}
      style={{ width: '200px' }}
    >
      Export
    </Button>
  )
}

export default ExportPolygon
