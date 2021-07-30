import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";
import classNames from "classnames";
import {toDate} from "../../utils/dateTime";


const PolygonTableSmall = ({ polygons, selectedPolygon, setSelectedPolygon }) => {

  return (
    <Card>
      <CardHeader style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
        <div>All polygons</div>
        <a onClick={() => setSelectedPolygon(null)}>
          <i className="tim-icons icon-bullet-list-67 text-info" />
        </a>
      </CardHeader>
      <CardBody style={{maxHeight: "450px", overflow: "scroll", marginBottom: "10px"}}>
        <Table responsive>
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
      </CardBody>
    </Card>
  )
}

export default PolygonTableSmall;