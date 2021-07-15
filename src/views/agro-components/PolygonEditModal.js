import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {editPolygon} from "../../features/polygons/actions";

import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row
} from "reactstrap";

const PolygonEditModal = ({ isOpen, close, polygon }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (polygon) {
      setName(polygon.name)
    }
  }, [polygon])

  const editingDisabled = () => {
    return polygon && !name.length
  }

  const confirmEdit = () => {
    let updatedPolygon = {...polygon, name: name};
    dispatch(editPolygon(updatedPolygon));
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
        <h6 className="title title-up">Edit polygon</h6>
      </div>
      <ModalBody>
        <Row>
          <Col>
            <p>You can change the name of the selected polygon.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <label>New name:</label>
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
          disabled={editingDisabled()}
          // color="link"
          data-dismiss="modal"
          type="button"
          onClick={confirmEdit}
        >
          Rename
        </Button>
      </div>
    </Modal>
  )
}

export default PolygonEditModal;