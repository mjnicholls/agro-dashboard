import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Col,
  Row,
  Table,
} from "reactstrap";
import classNames from "classnames";

import TogglerSatelliteMode from '../agro-components/TogglerSatellite'
import {setActivePoly} from "../../features/state/actions";
import {setSatelliteMode} from "../../features/state/actions";

const selectActivePoly = state => state.state.polygon;
const selectPolygons = state => state.polygons;
const selectIsSatelliteMode = state => state.state.isSatelliteMode;

const PolygonTableSmall = () => {

  const activePolygon = useSelector(selectActivePoly);
  const polygons = useSelector(selectPolygons);
  const isSatelliteMode = useSelector(selectIsSatelliteMode);
  const dispatch = useDispatch();

  return (
    <Card className="small-card">
      <CardHeader>
        <Row>
          <Col className="horizontal-container justify card-stats">
            <div>
              <h2 className="card-category">All</h2>
              <h2 className="mb-0">Polygons</h2>
            </div>
            <Button
              color="info"
              id="0"
              size="sm"
              tag="label"
              className={classNames("btn-simple", {
                active: isSatelliteMode,
              })}
              onClick={() => dispatch(setActivePoly(null))}
            ><i className="tim-icons icon-bullet-list-67" /></Button>
            {/*<a onClick={() => dispatch(setActivePoly(null))}>*/}
              {/*<div className="text-center">*/}
                {/*<i className="tim-icons icon-bullet-list-67" />*/}
              {/*</div>*/}
            {/*</a>*/}
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
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
      <CardFooter>
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