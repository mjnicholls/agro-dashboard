/* eslint-disable */

import React, {useState} from 'react';

import classnames from 'classnames'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Collapse,
  Row,
  Table
} from 'reactstrap'

import {getCropName} from './crops'

const CropMapCard = ({years, year, setYear, info}) => {

  const [openedCollapseOne, setOpenedCollapseOne] = useState(true);

  return (
    <Card className="crop-map-card">
      <div
        aria-multiselectable
        className="card-collapse"
        id="accordion"
        role="tablist"
      >
        <Card className="card-plain">
          <CardHeader role="tab">
            <Row>
              <Col sm="9">
                <Row>
                  {years.map(item =>
                    <Col sm="4" key={item}>
                      <Button
                        onClick={() => setYear(item)}
                        size="sm"
                        color={item === year ? "primary" : "default"}
                        className="mr-1"
                        // className={classnames({
                        //   'primary': item === year,
                        // })}
                      >{item}</Button>
                    </Col>)
                  }
                </Row>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <a
                  aria-expanded={openedCollapseOne}
                  href="#pablo"
                  data-parent="#accordion"
                  data-toggle="collapse"
                  onClick={(e) => {
                    e.preventDefault()
                    setOpenedCollapseOne(!openedCollapseOne)
                  }}
                >
                  <i className="tim-icons icon-minimal-down" />
                </a>
              </Col>
            </Row>
          </CardHeader>
          <Collapse role="tabpanel" isOpen={openedCollapseOne}>
        {info && <CardBody >
          <Row>
            <Col sm="5"><p className="p-1">Crop:</p></Col>
            <Col sm="7"><p className="p-1"><b>{getCropName(info.cdid)}</b></p></Col>
          </Row>
          <Row>
            <Col sm="5"><p className="p-1">NDVI min:</p></Col>
            <Col sm="7"><p className="p-1">{info.ndvi_low.toFixed(2)}</p></Col>
          </Row>
          <Row>
            <Col sm="5"><p className="p-1">NDVI max:</p></Col>
            <Col sm="7"><p className="p-1">{info.ndvi_high.toFixed(2)}</p></Col>
          </Row>
          {/*<Row>*/}
            {/*<Col><p>Area:</p></Col>*/}
            {/*<Col><p>{info.area}</p></Col>*/}
          {/*</Row>*/}
          {/*<Table>*/}
            {/*<tr>*/}
              {/*<td><p>Crop:</p></td>*/}
              {/*<td><p><b>{getCropName(info.cdid)}</b></p></td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
              {/*<td>NDVI min:</td>*/}
              {/*<td>{info.ndvi_low.toFixed(2)}</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
              {/*<td>NDVI max:</td>*/}
              {/*<td>{info.ndvi_high.toFixed(2)}</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
              {/*<td></td>*/}
              {/*<td></td>*/}
            {/*</tr>*/}
          {/*</Table>*/}
        </CardBody>}
          </Collapse>
        </Card>
      </div>
    </Card>
  )
}

export default CropMapCard;