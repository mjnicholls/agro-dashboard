import { polygonToLine } from "@turf/turf";
import React, {useState} from "react";
import {useDispatch} from 'react-redux';

import {
  Button,
  Col,
  FormGroup,
  Input,
  Row
} from "reactstrap";
import {deletePolygon} from "../../features/polygons/actions";

const PolygonDelete = ({ polygon, close }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const deletionDisabled = () => {
    return polygon && name !== polygon.name
  }

  const confirmDelete = () => {
    dispatch(deletePolygon(polygon.id));
    close();
  }

  return (
    <div>
      <Row>
        <Col className="mb-3" style={{marginBottom:"22px", marginTop:"22px" }}>
          <p>Are you sure you want to delete this polygon?</p>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3"  color="danger">
          <p> <b>Name: </b>{polygon.name}, <b>Area: </b> {polygon.area}</p>
        </Col>
      </Row>
     

      <div className="agro-pop-up-footer">
        <Button
          className="btn-primary"
          color="primary"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="btn-danger"
          color="danger"
         // disabled={deletionDisabled()}
          data-dismiss="modal"
          type="button"
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default PolygonDelete;