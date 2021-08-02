import React from 'react';

import {
  Col,
  Row,
  Table,
} from "reactstrap";
import classNames from "classnames";
import {toDate} from "../../utils/dateTime";


const PolygonTableSmall = ({ polygons, selectedPolygon, setSelectedPolygon }) => {

  return (
    <div style={{maxHeight: "350px", overflow: "scroll"}}>
      <Row>
        <Col style={{maxHeight: "350px", display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
          <h5 className="card-category">All polygons</h5>
          <a onClick={() => setSelectedPolygon(null)}>
            <i className="tim-icons icon-bullet-list-67 text-info" />
          </a>
        </Col>
      </Row>
      {/*y style={{maxHeight: "450px", overflow: "scroll", marginBottom: "10px"}}*/}
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
              <td>{toDate(polygon.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PolygonTableSmall;