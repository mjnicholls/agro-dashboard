import React, {useState} from "react";
import {useDispatch} from 'react-redux';

import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row
} from "reactstrap";
import {deletePolygon} from "../../features/polygons/actions";

const PolygonDeleteModal = ({ isOpen, close, polygon }) => {

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
    <Modal
      // modalClassName="modal-primary"
      isOpen={isOpen}
      toggle={close}
    >
      <div className="modal-header">
        <button
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={close}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
        <h6 className="title title-up">Delete polygon</h6>
      </div>
      <ModalBody>
        <Row>
          <Col>
            <p>Are you sure you want to delete selected polygon? Please enter its name to confirm:</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              {/*<label>Polygon name:</label>*/}
              <Row>
                <Col>
                  <Input
                    style={{color: "#222a42"}}
                    name="name"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <div className="modal-footer">
        <Button
          className="btn-neutral"
          color="default"
          // color="link"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          className="btn-neutral"
          color="default"
          disabled={deletionDisabled()}
          // color="link"
          data-dismiss="modal"
          type="button"
          onClick={confirmDelete}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}

export default PolygonDeleteModal