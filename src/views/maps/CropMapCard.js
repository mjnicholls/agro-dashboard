/* eslint-disable */

import React, {useState} from 'react';

import {useSelector} from 'react-redux';
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

const userSubscriptionSelector = (state) => state.auth.user.tariff


const CropMapCard = ({years, year, setYear, info}) => {

  const tariff = useSelector(userSubscriptionSelector)

  return (
    <Card className="crop-map-card">
          <CardHeader className="pl-3 d-flex align-items-center">
            {years.map(item =>
              <Button
                key={item}
                onClick={() => setYear(item)}
                size="sm"
                color={item === year ? "primary" : "default"}
                className="mr-1 mb-3"
                disabled={item === 2019 && tariff === "free"}
                // className={classnames({
                //   'primary': item === year,
                // })}
              >{item}</Button>)}
          </CardHeader>
        {info && <CardBody className="mt-0">
          {
            info.message ?
            <Row>
              <Col><p className="p-1">{info.message}</p></Col>
            </Row>
            : <>
              <Row>
                <Col><h4><b>{getCropName(info.cdid)}</b></h4></Col>
                {/*<Col sm="5"><p className="px-1">Crop:</p></Col>*/}
                {/*<Col sm="7"><p className="px-1"><b>{getCropName(info.cdid)}</b></p></Col>*/}
              </Row>
              <Row>
                <Col sm="5"><p>NDVI min:</p></Col>
                <Col sm="7"><p>{info.ndvi_low.toFixed(2)}</p></Col>
              </Row>
              <Row>
                <Col sm="5"><p>NDVI max:</p></Col>
                <Col sm="7"><p>{info.ndvi_high.toFixed(2)}</p></Col>
              </Row>
            </> }
        </CardBody>}
    </Card>
  )
}

export default CropMapCard;