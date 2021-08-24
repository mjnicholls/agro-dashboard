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
  Form,
  FormGroup,
  Input,
  Label,
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

import AllPolygonsButton from '../agro-components/AllPolygonsButton';

const selectAreaLimits = state => state.auth.limits.polygon_area;

const PolygonCreateCard = ({area, geoJson, intersections, mode, setMode, resetMap, mapHeight, blockResetMap}) => {

  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const areaLimits = useSelector(selectAreaLimits) || {};
  const minPolygonArea = areaLimits.min_polygon_area || 0.01;
  const maxPolygonArea = areaLimits.max_polygon_area || 3000;
  const dispatch = useDispatch();

  // const blockCreation = () => {
  //   return name.length === 0 || area < minPolygonArea || area > maxPolygonArea;
  // }

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


  return (
      <Card className="card-stats overflow-auto small-card" style={{height: mapHeight}}>
        <CardHeader className="mb-0">
          <Row>
            <Col xs="6" sm="8" md="9">
              <h5 className="card-category mb-0">create</h5>
              <CardTitle tag="h2">Polygon</CardTitle>
            </Col>
            <Col xs="6" sm="4" md="3">
              <AllPolygonsButton />
            </Col>
          </Row>
          <Row><Col><hr /></Col></Row>
        </CardHeader>
        <CardBody className="overflow-auto mb-5 py-2">
          <Nav className="nav-pills-github my-3" pills>
            <NavItem>
              <NavLink
                data-toggle="tab"
                className={classNames("agro-tab", {
                  active: mode === "draw",
                })}
                onClick={() => setMode("draw") }
              >
                Draw
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-toggle="tab"
                className={classNames("agro-tab", {
                  active: mode === "select",
                })}
                onClick={() => setMode("select") }>
                Select
              </NavLink>
            </NavItem>
          </Nav>
          <Form className="form-horizontal">
            <Row>
              <Label md="4 text-left">Name: * </Label>
              <Col md="8">
                <FormGroup>
                  <Input
                    className={error.name ? "danger-border" : ""}
                    name="name"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col md="4">
              <div className="category form-category">
                Area:
              </div>
            </Col>
            <Col md="8">
              <h4 className={
                classNames("text-right", {
                  "danger-color": (area > maxPolygonArea || area < minPolygonArea),
                  "invisible": !area
                })}>{area} ha</h4>
            </Col>
          </Row>
          <div className="card-category mb-3">
            <Row>
              <Col>
                <p>Minimum area is {minPolygonArea} ha</p>
                <p>Maximum area is {maxPolygonArea} hа</p>
                <p>No self-intersections</p>
              </Col>
            </Row>
          </div>

        <TabContent className="tab-space agro-tab card-category" activeTab={mode}>
          <TabPane tabId="draw">
            <ol className="pl-0">
              <li>Click on the polygon tool to activate draw mode.</li>
              <li>Place the pointer on the map and click the location of the first point to start drawing.</li>
              <li>Continue clicking at each corner of the shape until you have created the polygon.</li>
              <li>Click the first point to stop drawing.</li>
              <li>Double-click any point to edit.</li>
            </ol>
          </TabPane>
          <TabPane tabId="select">
            <ol className="pl-0">
              <li>Click on any crop to select.</li>
              <li>Double-click any point to edit.</li>
              <span className="my-3">If you can't see crops layer, please zoom out to see the territories where crops have been identified.
If there is no identified crops for your territory at the moment please use the "Draw" mode to create your polygon.</span>
            </ol>
          </TabPane>
        </TabContent>
      </CardBody>
        <CardFooter className="justify-content-end pr-0 w-100">
          <Row className="justify-content-end w-100 my-3">
          <Button
            // disabled={!name || blockResetMap()} TODO
            className="btn-simple"
            color="github"
            onClick={reset}
          >
            Reset
          </Button>
          <Button
            // disabled={blockCreation()}
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