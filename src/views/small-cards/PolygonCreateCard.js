import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import {addPolygon} from '../../features/polygons/actions';
import {notifyError} from '../../features/notifications/actions';
import classNames from "classnames";

const selectAreaLimits = state => state.auth.limits.polygon_area;

const PolygonCreateCard = ({area, geoJson, intersections, mode, setMode, resetMap, mapHeight, blockResetMap}) => {

  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const areaLimits = useSelector(selectAreaLimits) || {};
  const minPolygonArea = areaLimits.min_polygon_area || 0.01;
  const maxPolygonArea = areaLimits.max_polygon_area || 3000;
  const dispatch = useDispatch();

  const blockCreation = () => {
    return name.length === 0 || area < minPolygonArea || area > maxPolygonArea;
  }

  const createPolygonLocal = () => {
    setError({});
    let newError = {};
    let errorMessage = '';
    if (!name.length) {
      newError.name = true;
      errorMessage = "Please enter polygon's name\n"
    }
    if (intersections) {
      newError.intersection = true;
      errorMessage = errorMessage + "Polygons cannot contain self-intersections\n";
    }
    if (area < minPolygonArea || area > maxPolygonArea) {
      newError.area = true;
      let err = area < minPolygonArea ? "Polygon's area should be more than " + minPolygonArea + " ha" : "Polygon's area should not exceed " + maxPolygonArea + " ha"
      errorMessage = errorMessage + err;
    }
    if (Object.keys(newError).length) {
      setError(newError);
      dispatch(notifyError(errorMessage));
      return
    };
    let data = {
      name: name,
      geo_json: geoJson
    }
    dispatch(addPolygon(data));
    reset();
  }

  const reset = () => {
    setName("");
    resetMap()
  }

  const rules = () => (<>
    Please follow the rules below:
    <ul>
      <li>Minimum area is {minPolygonArea} ha</li>
      <li>Maximum area is {maxPolygonArea} hа</li>
      <li>No self-intersections</li>
    </ul>
  </>)

  return (
      <Card className="overflow-auto small-card" style={{height: mapHeight}}>
        <CardHeader className="mb-0">
          <CardTitle tag="h2">New polygon</CardTitle>
          <FormGroup className="mb-3">
            <label>Polygon name *</label>
            <Row>
              <Col>
                <Input
                  className={error.name ? "danger-border" : ""}
                  name="name"
                  type="text"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </Col>
            </Row>
          </FormGroup>
         <div
          className="category form-category"

          style={{textTransform: "none", visibility: area ? "visible" : "hidden"}}>
          Area <h4 className={
            classNames({
              "danger-color": (area > maxPolygonArea || area < minPolygonArea),
            })}>{area} ha</h4>
        </div>


        <Nav className="nav-pills-github" pills>
          <NavItem>
            <NavLink
              data-toggle="tab"
              href="#pablo"
              className={mode === "draw" ? "active" : ""}
              onClick={() => setMode("draw") }
              style={{paddingRight: "15px", paddingLeft: "15px"}}
            >
              Draw
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              data-toggle="tab"
              href="#pablo"
              className={mode === "select" ? "active" : ""}
              onClick={() =>
                setMode("select")
              }
              style={{paddingRight: "15px", paddingLeft: "15px"}}
              // style={{padding: "5px 10px"}}
            >
              Select
            </NavLink>
          </NavItem>
          {/*<NavItem>*/}
            {/*<NavLink*/}
              {/*data-toggle="tab"*/}
              {/*href="#pablo"*/}
              {/*className={mode === "import" ? "active" : ""}*/}
              {/*onClick={() =>*/}
                {/*setMode("import")*/}
              {/*}*/}
            {/*>*/}
              {/*Import*/}
            {/*</NavLink>*/}
          {/*</NavItem>*/}
        </Nav>
      </CardHeader>
    <CardBody>

        <TabContent className="tab-space agro-tab" activeTab={mode}>
          <TabPane tabId="draw">
            Draw polygon
            <br />
            <ol>
              <li>Click on the polygon icon to activate draw mode.</li>
              <li>Place the pointer on the map and click the location of the first point to start drawing.</li>
              <li>Continue clicking at each corner of the shape until you have created the polygon.</li>
              <li>Click the first point to stop drawing.</li>
              <li>Double-click any point to edit.</li>
            </ol>
            {rules()}
          </TabPane>
          <TabPane tabId="select">
            <ol>
              <li>Click on a polygon to select.</li>
              <li>Double-click to edit.</li>
              <li>If you can't see crops...</li>
            </ol>
            {rules()}
          </TabPane>
          <TabPane tabId="import">
            Import file. Help on importing, available formats description <br /><br />
            {rules()}
          </TabPane>
        </TabContent>

      </CardBody>
        <CardFooter className="justify-content-end pr-0 w-100">
          <Row className="justify-content-end w-100">
          <Button
            // disabled={!name || blockResetMap()} TODO
            color="default"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            // disabled={blockCreation()} TODO
            color="primary"
            onClick={createPolygonLocal}
          >
            Create
          </Button>
          </Row>
        </CardFooter>
      </Card>
  )
}

export default PolygonCreateCard;