import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
} from "reactstrap";
import classNames from "classnames";
import {toDate} from "../../utils/dateTime";


const PolygonTableSmall = ({ polygons, selectedPolygon, setSelectedPolygon }) => {

  return (
    <Card style={{height: "100%"}}>
      <CardHeader>
        <Row>
          <Col className="horizontal-container justify card-stats">
            <div>
              <h2 className="card-category">All</h2>
              <h2 className="mb-0">Polygons</h2>
            </div>
            <a onClick={() => setSelectedPolygon(null)}>
              <div className="info-icon text-center icon-primary">
                <i className="tim-icons icon-bullet-list-67" />
              </div>
            </a>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="current-card">
        <Table>
          <tbody>
            {polygons.map(polygon => (
              <tr
                className={classNames("clickable-table-row", {
                  "highlight-background": polygon.id === selectedPolygon.id,
                })}
                onClick={() => {setSelectedPolygon(polygon)}}
                key={`polygon_${polygon.id}`} >
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

export default PolygonTableSmall;