import React from 'react'

import { useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  UncontrolledTooltip,
} from 'reactstrap'

import { getCropName } from './crops'

const userSubscriptionSelector = (state) => state.auth.user.tariff

const CropMapCard = ({ years, year, setYear, info }) => {
  const tariff = useSelector(userSubscriptionSelector)

  const calculateArea = () => {
    let metersPerPx =
      (156543.03392 * Math.cos((info.lat * Math.PI) / 180)) / 2 ** 14
    return ((info.area * metersPerPx) / 10000).toFixed(2) + 'ha'
  }

  const isNotActive = (item) => {
    return tariff === 'free' && item === 2019
  }

  return (
    <Card className="crop-map-card">
      <CardHeader className="pl-3 d-flex align-items-center">
        {years.map((item) => (
          <div className="mr-2 mb-3" key={item} id={'year_' + item}>
            <Button
              onClick={() => setYear(item)}
              size="sm"
              color={item === year ? 'primary' : 'default'}
              disabled={isNotActive(item)}
            >
              {item}
            </Button>
            {isNotActive(item) && (
              <UncontrolledTooltip delay={0} target={'year_' + item}>
                Not available with your tarriff
              </UncontrolledTooltip>
            )}
          </div>
        ))}
      </CardHeader>
      {info && (
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
