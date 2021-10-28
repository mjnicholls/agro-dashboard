import React, { useEffect, useState } from 'react'
import { numberWithCommas } from '../../utils/utils'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  NavItem,
  NavLink,
  Nav,
  Table,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from 'reactstrap'
import { getPolygons } from '../../api/personalAccount'
import ExportPolygons from './ExportPolygons'

const ChargeBreakDown = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    getPolygons()
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
  }, [])

  return (
    <Table>
      <thead>
        <tr>
          <th colSpan={2}>Polygons</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Created polygons, total area:</td>
          <td>{numberWithCommas(data.full_area)} ha</td>
        </tr>
        <tr>
          <td>Total area polygons by tariff:</td>
          <td>{numberWithCommas(data.permissible_area)} ha</td>
        </tr>
        <tr>
          <td>Exceeding area polygons:</td>
          <td>{numberWithCommas(data.exceeding_area_limit)} ha</td>
        </tr>
        <tr>
          <td>Charge for exceeding area:</td>
          <td>{numberWithCommas(data.payment_for_exceeding_area_limit)}</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th colSpan={2}>
            <br />
            Export Polygons to CSV File
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2} className="text-right">
            <ExportPolygons />
          </td>
        </tr>
      </tbody>
    </Table>
  )
}

export default ChargeBreakDown
