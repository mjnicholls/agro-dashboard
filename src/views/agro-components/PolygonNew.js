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
  Label,
  Row,
  Col,
} from "reactstrap";
import LeafletCreatePolygon from '../maps/LeafletCreatePolygon'
import LeafletDrawReact from '../maps/LeafletDrawReact'
import {createPolygon} from '../../services/api/polygonApi'


const PolygonNew = () => {
  /** Draw a new polygon, give it a name */

  const [name, setName] = React.useState("");
  const [geoJson, setGeoJson] = React.useState(null);
  const [area, setArea] = React.useState("");
  const [intersection, setIntersection] = React.useState(false);
  const [error, setError] = React.useState({});

  const createPolygonLocal = () => {
    setError({});
    if (!name) {
      setError({
        name: true
      })
    }
    if (intersection) {
      setError({
        intersection: true
      })
    }
    if (area < 1 || area > 3000) {
       setError({
        area: true
      })
    }
    if (Object.keys(error).length) return;
    let data = {
      name: name,
      geo_json: geoJson
    }
    console.log(data)
    createPolygon(data)
  }

  const allowCreation = () => {
    return name.length && area > 1 && area < 3000;
  }

  return (
     <>
      <div className="content">
        <Row>
          <Col md="8">
            <LeafletCreatePolygon
              setArea={setArea}
              setGeoJson={setGeoJson}
              setIntersection={setIntersection}
            />
            {/*<LeafletDrawReact />*/}
          </Col>
          <Col md="4">
            <Form id="RegisterValidation">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">New polygon</CardTitle>
                </CardHeader>
                <CardBody>
                  <FormGroup
                    className={error.name ? "has-danger" : ""}
                    // className={`has-label ${registerEmailState}`}
                  >
                    <label>Polygon name *</label>
                    <Row>
                    <Col>
                      <Input
                        name="name"
                        type="text"
                        onChange={e => setName(e.target.value)}
                      />
                    </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup
                    className={error.intersection ? "has-danger" : ""}
                  >
                    <label>Area </label>
                    <Input
                      disabled
                      name="area"
                      type="text"
                      value={area + (area ? " ha" : "")}
                    />
                  </FormGroup>
                  {/*<div>*/}
                    {/*{geoJson}*/}
                  {/*</div>*/}
                  <div className="category form-category">
                    <span style={{display: "block", textTransform: "none"}}>* Minimum area is 1 ha</span>
                    <span style={{display: "block", textTransform: "none"}}>* Maximum area is 3000 hа</span>
                    <span style={{display: "block", textTransform: "none"}}>* No self-intersections</span>
                  </div>
                </CardBody>
                <CardFooter className="text-right">
                  <Button
                    // disabled={allowCreation()}
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