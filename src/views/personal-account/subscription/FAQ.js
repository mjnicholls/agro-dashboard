import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap'

import ExceedingPriceInfo from '../../components/ExceedingPriceInfo'

const FAQ = () => {
  const [alert, setAlert] = useState(null)

  const priceInfoAlert = () => {
    setAlert(<ExceedingPriceInfo close={() => setAlert(null)} />)
  }

  return (
    <>
      {alert}
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>FAQ</h2>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg="4">
              <div className="mb-5">
                <h4>
                  <b>What does a monthly price consist of?</b>
                </h4>
                <p>
                  The monthly price for your subscription consists of two parts:
                </p>
                <ul>
                  <li>
                    <p>
                      a fixed fee for a certain fixed area of polygons (your
                      fields) per month
                    </p>
                  </li>
                  <li>
                    <p>
                      <Button
                        role="button"
                        onClick={priceInfoAlert}
                        className="btn-link btn-primary remove-button-style"
                      >
                        fee for all exceeded areas
                      </Button>{' '}
                      over that threshold area.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <h4>
                  <b>What is a monthly fixed fee?</b>
                </h4>
                <p>
                  Fixed fee depends on a chosen subscription; each subscription
                  has its own allowance threshold.
                </p>{' '}
                <p>
                  For example, fixed fee of Starter subscription covers a
                  territory that is not exceeding 4,000 ha in total per month.
                  Everything after this threshould will be charge via fee for
                  exceeded areas.
                </p>
              </div>
            </Col>

            <Col lg="4">
              <div className="mb-5">
                <h4>
                  <b>How do we calculate active area within a month?</b>
                </h4>
                <p>
                  Any polygon that is created under your account is considered
                  as an active polygon. When you create a new polygon, it starts
                  to receive data automatically, and we add up its area to the
                  total monthly active area by default.
                </p>
                <p>
                  If you delete a polygon, it still will be considered as an
                  active in the current calendar month, although it will not be
                  counted in the next calendar period.
                </p>
              </div>
              <div className="mb-5">
                <h4>
                  <b>How is exceeding area fee calculated?</b>
                </h4>
                <p>
                  We count area of your active polygons that exceeds a monthly
                  threshold of your subscription. Different subscriptions have
                  different price rate for exceeded area, please refer to
                  the&nbsp;
                  <Link to="/users/billing-plans">pricing page</Link> for
                  details.
                </p>
              </div>
            </Col>
            <Col lg="4">
              <div className="mb-5">
                <h4>
                  <b>What is a monthly period?</b>
                </h4>
                <p>
                  For recurrent subscription, it is a one month starting from
                  the day of your subscription. At the end of the calendar
                  month, we will charge your account for all your polygons
                  during that month.
                </p>
                <p>
                  For manual invoicing, it is a calendar month. We count your
                  subscription activity and charge from the 1st to the last day
                  of each month. You can subscribe to our service at any day of
                  the month, for your first month we calculate your monthly fee
                  on daily basis.
                </p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default FAQ
