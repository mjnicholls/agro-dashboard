import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import MapBoxDraw from './maps/MapBoxDraw'
import {addPolygon} from '../features/polygons/actions'
import { useDispatch, useSelector } from 'react-redux';

const selectAreaLimits = state => state.auth.limits.polygon_area;

const PolygonNew = () => {
  /** Draw a new polygon, give it a name */

  const [name, setName] = React.useState("");
  const [geoJson, setGeoJson] = React.useState(null);
  const [area, setArea] = React.useState("");
  const [intersection, setIntersection] = React.useState(false);
  const [error, setError] = React.useState({});

  const areaLimits = useSelector(selectAreaLimits) || {};
  const minPolygonArea = areaLimits.min_polygon_area || 0.01;
  const maxPolygonArea = areaLimits.max_polygon_area || 3000;

  const drawRef = React.useRef(null);

  const dispatch = useDispatch();

  const createPolygonLocal = () => {
    setError({});
    let newError = {};

    if (!name.length) {
      newError.name = true
    }
    if (intersection) {
      newError.intersection = true
    }
    if (area < minPolygonArea || area > maxPolygonArea) {
      newError.area = true
    }
    if (Object.keys(newError).length) {
      setError(newError);
      return
    };
    let data = {
      name: name,
      geo_json: geoJson
    }
    dispatch(addPolygon(data))
    drawRef.current.deleteAll()
    setName("");
    setArea(null);
    setIntersection(false);
  }

  const blockCreation = () => {
    return name.length === 0 || area < minPolygonArea || area > maxPolygonArea;
  }

  return (
     <>
      <div className="content">
        <Row>
          <Col md="8">
            <MapBoxDraw
              setArea={setArea}
              setGeoJson={setGeoJson}
              drawRef={drawRef}
            />
          </Col>
          <Col md="4">
            <Form id="RegisterValidation">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">New polygon</CardTitle>
                </CardHeader>

                <CardBody>
                  <FormGroup>
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
                  Area <h4 className={error.area ? "danger-color" : ""}>{area} ha</h4>
                </div>

                <div className="category form-category">
                  <span style={{display: "block", textTransform: "none"}}>* Minimum area is {minPolygonArea} ha</span>
                  <span style={{display: "block", textTransform: "none"}}>* Maximum area is {maxPolygonArea} hа</span>
                  <span style={{display: "block", textTransform: "none"}}>* No self-intersections</span>
                </div>
              </CardBody>

                <CardFooter className="text-right">
                  <Button
                    disabled={blockCreation()}
                    color="primary"
                    onClick={createPolygonLocal}
                  >
                    Create
                  </Button>
                </CardFooter>

              </Card>
            </Form>
          </Col>
        </Row>
      </div>
     </>
  )
}

export default PolygonNew