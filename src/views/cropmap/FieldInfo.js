import React from 'react'

import { Col, Row } from 'reactstrap'

import { getCropName } from '../maps/crops'

const CropMapInfo = ({ info }) => {
  const calculateArea = () => {
    const metersPerPx =
      (156543.03392 * Math.cos((info.lat * Math.PI) / 180)) / 2 ** 14
    return `${((info.area * metersPerPx) / 10000).toFixed(2)}ha`
  }

  return (
    <>
      <Row>
        <Col>
          <h4>
            <b>{getCropName(info.cdid)}</b>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
          <p>Area:</p>
        </Col>
        <Col xs="7">
          <p>{calculateArea()}</p>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
          <p>NDVI min:</p>
        </Col>
        <Col xs="7">
          <p>{info.ndvi_low.toFixed(2)}</p>
        </Col>
      </Row>
      <Row>
        <Col xs="5">
          <p>NDVI max:</p>
        </Col>
        <Col xs="7">
          <p>{info.ndvi_high.toFixed(2)}</p>
        </Col>
      </Row>
    </>
  )
}

export default CropMapInfo
