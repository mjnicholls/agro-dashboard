import React from 'react'

import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap'

import { setActivePoly } from '../../features/state/actions'
import ToggleModes from '../agro-components/ToggleModes'

const selectActivePoly = (state) => state.state.polygon
const selectPolygons = (state) => state.polygons

const PolygonTableSmall = () => {
  const activePolygon = useSelector(selectActivePoly)
  const polygons = useSelector(selectPolygons)
  const dispatch = useDispatch()

  return (
    <Card className="small-card mb-5 pb-3">
      <CardHeader>
        <Row>
          <Col xs="6" sm="8" md="9">
            <h5 className="card-category mb-0">All</h5>
            <CardTitle tag="h2">Polygons</CardTitle>
          </Col>
          <Col xs="6" sm="4" md="3">
            <ToggleModes />
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="py-2 overflow-auto">
        <Table>
          <tbody>
            {polygons.map((polygon) => (
              <tr
                className={classNames('clickable-table-row', {
                  'highlight-background': polygon.id === activePolygon.id,
                })}
                onClick={() => {
                  dispatch(setActivePoly(polygon))
                }}
                key={`polygon_${polygon.id}`}
              >
                <td>{polygon.name}</td>
                <td className="text-right">{polygon.area.toFixed(1)}ha</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default PolygonTableSmall
