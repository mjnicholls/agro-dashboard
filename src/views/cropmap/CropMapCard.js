import React from 'react'

import PropTypes from 'prop-types'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

import FieldInfo from './FieldInfo'
import YearSelector from './YearSelector'

const CropMapCard = ({ years, activeYear, setActiveYear, info }) => (
  <Card
    className="crop-map-card"
    style={activeYear.status < 3 ? { boxShadow: 'none' } : {}}
  >
    <CardHeader className="d-flex align-items-center pb-3">
      <YearSelector
        years={years}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
      />
    </CardHeader>
    {info && activeYear.status === 3 && (
      <CardBody className="mt-0 pt-1">
        {info.message ? (
          <Row>
            <Col>
              <p className="my-1">{info.message}</p>
            </Col>
          </Row>
        ) : (
          <FieldInfo info={info} />
        )}
      </CardBody>
    )}
  </Card>
)

CropMapCard.propTypes = {
  years: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      status: PropTypes.number,
    }),
  ),
}

export default CropMapCard
