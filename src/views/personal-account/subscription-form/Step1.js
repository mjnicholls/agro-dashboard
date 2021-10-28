import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { Col, Form, Label, FormGroup, Input, Row } from 'reactstrap'

import { titles } from '../../../config'

const Step1 = ({ invoiceSettings, setInvoiceSettings, user, error }) => {
  const handleChange = (key, value) => {
    const newObj = { ...invoiceSettings }
    newObj[key] = value
    setInvoiceSettings(newObj)
  }

  return (
    <div>
      <Form className="mt-4">
        <Label>Legal form: </Label>
        <FormGroup check className="form-check-radio">
          <Label check className="mr-3">
            <Input
              id="individualRadioButton"
              name="legalForm"
              type="radio"
              checked={invoiceSettings.type === 'individual'}
              onChange={() => handleChange('type', 'individual')}
              disabled={
                user.active_stripe_customer &&
                invoiceSettings.type === 'organisation'
              }
            />
            <span className="form-check-sign" />
            Individual
          </Label>
          <Label check>
            <Input
              id="organisationRadioButton"
              name="legalForm"
              type="radio"
              checked={invoiceSettings.type === 'organisation'}
              onChange={() => handleChange('type', 'organisation')}
              disabled={
                user.active_stripe_customer &&
                invoiceSettings.type === 'individual'
              }
            />
            <span className="form-check-sign" />
            Organisation
          </Label>
        </FormGroup>
      </Form>

      <Form className="form-horizontal">
        {invoiceSettings.type === 'individual' ? (
          <Row>
            <Col className="mt-4">
              <Label>Title</Label>
              <FormGroup>
                <Select
                  className="react-select info mb-3"
                  classNamePrefix="react-select"
                  options={titles}
                />
              </FormGroup>
            </Col>
            <Col className="mt-4">
              <Label>First Name *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  value={invoiceSettings.first_name}
                  className={error.first_name ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.first_name ? 'd-block' : '',
                  )}
                >
                  {error.first_name}
                </div>
              </FormGroup>
            </Col>
            <Col className="mt-4">
              <Label>Last Name *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  value={invoiceSettings.last_name}
                  className={error.last_name ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.last_name ? 'd-block' : '',
                  )}
                >
                  {error.last_name}
                </div>
              </FormGroup>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col className="mt-4">
              <Label>Organisation name *</Label>
              <FormGroup>
                <Input
                  type="text"
                  onChange={(e) => handleChange('organisation', e.target.value)}
                  value={invoiceSettings.organisation}
                  className={error.organisation ? 'danger-border' : ''}
                />
                <div
                  className={classnames(
                    'invalid-feedback ',
                    error.organisation ? 'd-block' : '',
                  )}
                >
                  {error.organisation}
                </div>
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row>
          <Col className="mt-4">
            <Label>Email</Label>
            <FormGroup>
              <Input type="text" value={user.email} disabled />
            </FormGroup>
          </Col>
          <Col className="mt-4">
            <Label>Phone *</Label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => handleChange('phone', e.target.value)}
                value={invoiceSettings.phone}
                className={error.phone ? 'danger-border' : ''}
              />
              <div
                className={classnames(
                  'invalid-feedback ',
                  error.phone ? 'd-block' : '',
                )}
              >
                {error.phone}
              </div>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Step1.propTypes = {
  error: PropTypes.object,
  invoiceSettings: PropTypes.object,
  user: PropTypes.shape({
    full_name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    active_stripe_customer: PropTypes.bool,
  }),
  setInvoiceSettings: PropTypes.func,
}

export default Step1
