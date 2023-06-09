import React from 'react'

import { useDispatch } from 'react-redux'
import { Button, Col, Row } from 'reactstrap'

import { deletePolygon } from '../../features/polygons/actions'

const PolygonDelete = ({ polygon, close }) => {
  const dispatch = useDispatch()

  const confirmDelete = () => {
    dispatch(deletePolygon(polygon.id))
    close()
  }

  return (
    <div>
      <Row>
        <Col
          className="mb-3"
          style={{ marginBottom: '22px', marginTop: '22px' }}
        >
          <p>Are you sure you want to delete this polygon?</p>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3" color="danger">
          <p>
            {' '}
            <b>
              {polygon.name}, {polygon.area.toFixed(2)} ha
            </b>
          </p>
        </Col>
      </Row>

      <div className="agro-pop-up-footer">
        {/* <Button
          className="btn-neutral"
          color="default"
          type="button"
          onClick={close}
        >
          Cancel
        </Button>
       */}
        <Button
          className="btn-danger"
          color="danger"
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

export default PolygonDelete
