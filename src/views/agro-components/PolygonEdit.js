import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { editPolygon } from '../../features/polygons/actions'

const PolygonEdit = ({ polygon, close }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  useEffect(() => {
    if (polygon) {
      setName(polygon.name)
    }
  }, [polygon])

  const editingDisabled = () => polygon && !name.length

  const confirmEdit = () => {
    const updatedPolygon = { ...polygon, name }
    dispatch(editPolygon(updatedPolygon))
    close()
  }

  return (
    <div>
      <Row>
        <Col className="mb-3">
          <p>You can change the name of the selected polygon.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Label>New name:</Label>
              <Row>
                <Col>
                  <Input
                    style={{ color: '#222a42' }}
                    name="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Col>
              </Row>
            </FormGroup>
          </Form>
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
    </div>
  )
}

export default PolygonEdit
