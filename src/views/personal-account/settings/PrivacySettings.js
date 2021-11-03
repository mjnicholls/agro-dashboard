import React from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap'

import { updateMailingPreferences } from '../../../api/personalAccount'
import {
  notifyError,
  notifySuccess,
} from '../../../features/notifications/actions'

const PrivacySettings = ({ mailSettings, setMailSettings }) => {
  const dispatch = useDispatch()

  const handleCheckBoxClick = (key, value) => {
    const newObj = { ...mailSettings }
    newObj[key] = value
    setMailSettings(newObj)
  }

  const confirmMailSettings = () => {
    updateMailingPreferences(mailSettings)
      .then(() => {
        dispatch(notifySuccess('Settings updated'))
      })
      .catch((err) => {
        dispatch(notifyError(`Error updating settings: ${err.message}`))
      })
  }

  return (
    <>
      <h4>Privacy settings</h4>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <p className="mb-3">
                Please indicate what news from our company you would like to
                receive by email:
              </p>
              <Form className="checkbox-radios ml-5">
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        handleCheckBoxClick('news', e.target.checked)
                      }}
                      checked={mailSettings.news}
                    />
                    <span className="form-check-sign" />
                    <p>
                      System news (API usage alerts, system updates, temporary
                      system shutdown, etc)
                    </p>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        handleCheckBoxClick('product', e.target.checked)
                      }}
                      checked={mailSettings.product}
                    />
                    <span className="form-check-sign" />
                    <p>
                      Product news (changes to prices, new product features,
                      etc)
                    </p>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        handleCheckBoxClick('system', e.target.checked)
                      }}
                      checked={mailSettings.system}
                    />
                    <span className="form-check-sign" />
                    <p>
                      Corporate news (our life, launch of new services, etc)
                    </p>
                  </Label>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="text-right">
          <Button
            className="btn-fill"
            color="primary"
            type="button"
            onClick={confirmMailSettings}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

PrivacySettings.propTypes = {
  mailSettings: PropTypes.object,
  setMailSettings: PropTypes.func,
}

export default PrivacySettings
