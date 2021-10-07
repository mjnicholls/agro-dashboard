/* eslint-disable */
import React from 'react'

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap'
import classNames from 'classnames'

import { getCropName } from './crops'
import TabsSelector from '../agro-components/TabsSelector'

const CropMapCard = ({ years, activeYear, setActiveYear, info }) => {

  const calculateArea = () => {
    let metersPerPx =
      (156543.03392 * Math.cos((info.lat * Math.PI) / 180)) / 2 ** 14
    return ((info.area * metersPerPx) / 10000).toFixed(2) + 'ha'
  }

  return (
    <Card className="crop-map-card"
          style={ activeYear.status < 3 ? {boxShadow: 'none'} : {}}
    >
      <CardHeader className="d-flex align-items-center ">
        <div className='mb-3'>
          <TabsSelector options={years} activeTab={activeYear} setActiveTab={setActiveYear} />
        </div>
        <ButtonGroup>
        {/*<Row className="justify-content-start">*/}
        {/*<Col sm="2" key={"year_" + yearInArray.activeYear} className="mr-2"></Col></Row>*/}
        {years.map((yearInArray) => (
            <Button
            color="github"
            id={yearInArray.id}
            size="sm"
            tag="label"
            key={yearInArray.id}
            className={classNames('btn-simple btn-link', {
              'disabled-year': (yearInArray.id !== activeYear.id && yearInArray.status < 3),
              'active-year': yearInArray.id === activeYear.id
            })}
            onClick={() => setActiveYear(yearInArray)}
            style={{ padding: '5px 10px' }}
          >
            <span>{yearInArray.label}</span>
          </Button>


            // <Button
            //   id={"year_" + yearInArray.year}
            //   key={"year_" + yearInArray.year}
            //   onClick={() => setActiveYear(yearInArray)}
            //   // color={yearInArray.activeYear === activeYear.activeYear ? 'primary' : yearInArray.status === 3 ? 'github' : 'default'}
            //   className='mr-2 mb-3 btn-link btn-simple'
            //   style={{color: yearInArray.year === activeYear.year ? 'pink': 'white'}}
            //   // className={classNames('mb-3 btn default primary', {
            //   //   // 'primary': yearInArray.activeYear === activeYear.activeYear,
            //   //   // 'github': yearInArray.status < 3
            //   // })}
            // >
            //   {yearInArray.year}
            // </Button>
        ))}
        </ButtonGroup>
      </CardHeader>
      {(info && (activeYear.status === 3)) && (
        <CardBody className="mt-0 pt-1">
          {info.message ? (
            <Row>
              <Col>
                <p className="p-1">{info.message}</p>
              </Col>
            </Row>
          ) : (
            <>
              <Row>
                <Col>
                  <h4>
                    <b>{getCropName(info.cdid)}</b>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>Area:</p>
                </Col>
                <Col sm="7">
                  <p>{calculateArea()}</p>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>NDVI min:</p>
                </Col>
                <Col sm="7">
                  <p>{info.ndvi_low.toFixed(2)}</p>
                </Col>
              </Row>
              <Row>
                <Col sm="5">
                  <p>NDVI max:</p>
                </Col>
                <Col sm="7">
                  <p>{info.ndvi_high.toFixed(2)}</p>
                </Col>
              </Row>
            </>
          )}
        </CardBody>
      )}
    </Card>
  )
}

export default CropMapCard
