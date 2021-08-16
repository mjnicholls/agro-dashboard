import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";
import classNames from "classnames";

import TogglerSatelliteMode from '../agro-components/TogglerSatellite'
import {setActivePoly} from "../../features/state/actions";

const selectActivePoly = state => state.state.polygon;
const selectPolygons = state => state.polygons;

const PolygonTableSmall = () => {

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const dispatch = useDispatch();

  return (
    <Card className="small-card mb-5">
      <CardHeader>
        <Row>
          <Col xs="9">
            <h5 className="card-category mb-0">All</h5>
            <CardTitle tag="h2">Polygons</CardTitle>
          </Col>
          <Col xs="3">
            <Button
              color="github"
              className="btn-simple"
              size="sm"
              tag="label"
              onClick={() => dispatch(setActivePoly(null))}
            ><i className="tim-icons icon-bullet-list-67" /></Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody className="py-0" style={{overflowY: "scroll", marginBottom: "60px"}}>
        <Table>
          <tbody>
            {polygons.map(polygon => (
              <tr
                className={classNames("clickable-table-row", {
                  "highlight-background": polygon.id === activePolygon.id,
                })}
                onClick={() => {dispatch(setActivePoly(polygon))}}
                key={`polygon_${polygon.id}`} >
                <td>{polygon.name}</td>
                <td className="text-right">{polygon.area.toFixed(1)}ha</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
      <CardFooter style={{position: "absolute", bottom: 0, right: 0}}>
        <Row>
          <Col>
            <TogglerSatelliteMode />
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default PolygonTableSmall;