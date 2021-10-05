import React from 'react'

import classNames from 'classnames'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap'

import { toDate } from '../../utils/dateTime'
import { totalArea } from '../../utils/utils'
import Shape from '../agro-components/Shape'
// import {setActivePoly} from "../../features/state/actions";

const PolygonInfo = ({ polygonInFocus }) => (
  <Card
    className={classNames('card-stats d-none d-lg-block mb-5', {
      'small-card':
        polygonInFocus &&
        typeof polygonInFocus === 'object' &&
        polygonInFocus instanceof Array,
    })}
  >
    <CardHeader>
      <Row>
        <Col>
          <div className="numbers text-right">
            <p className="card-category">polygon</p>
            <CardTitle tag="h3">Information</CardTitle>
          </div>
        </Col>
      </Row>
    </CardHeader>
    <CardBody style={{ minHeight: '120px' }}>
      <hr />
      <br />
      <Row>
        <Col>
          {polygonInFocus ? (
            polygonInFocus instanceof Array ? (
              <>
                <div className=" d-flex justify-content-between align-items-center">
                  <p className="numbers font-weight-bold">
                    {polygonInFocus.length} polygons
                  </p>
                  <p className="numbers font-weight-bold">
                    {totalArea(polygonInFocus)}ha
                  </p>
                </div>
                <br />
                <Table>
                  <tbody>
                    {polygonInFocus.map((polygon) => (
                      <tr
                        // className={classNames("clickable-table-row", {
                        //   "highlight-background": polygon.id === activePolygon.id,
                        // })}
                        // onClick={() => {dispatch(setActivePoly(polygon))}}
                        key={`polygon_${polygon.id}`}
                      >
                        <td>{polygon.name}</td>
                        <td className="text-right">
                          {polygon.area.toFixed(1)}ha
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <div className="card-category">
                <Row>
                  <Col>
                    <div className="numbers d-flex justify-content-between align-items-center">
                      <CardTitle tag="h3">{polygonInFocus.name}</CardTitle>
                      <div className="pb-3 ml-3">
                        <Shape polygon={polygonInFocus} />
                      </div>
                    </div>
                    <div className="numbers d-flex justify-content-between align-items-center">
                      <span>Area</span>
                      <p className="numbers font-weight-bold">
                        {polygonInFocus.area.toFixed(2)}ha
                      </p>
                    </div>
                    <div className="numbers d-flex justify-content-between align-items-center">
                      <span>Created</span>
                      <p className="numbers font-weight-bold">
                        {toDate(polygonInFocus.created_at)}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            )
          ) : (
            <>
              <p className="mb-3">Hover over a polygon for more information</p>
              <p>
                Click on a polygon to see its detailed satellite and weather
                data
              </p>
            </>
          )}
        </Col>
      </Row>
    </CardBody>
  </Card>
)

export default PolygonInfo
