import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  Row,
} from 'reactstrap'

import { updateMailingPreferences } from '../../api/personalAccountAPI'
import {
  notifyError,
  notifySuccess,
} from '../../features/notifications/actions'
import PropTypes from 'prop-types'

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
      // eslint-disable-next-line
      .catch((error) => {
        dispatch(notifyError(`Error updating settings: ${error.message}`))
      })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Privacy Settings</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <p>
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
                    Product news (changes to prices, new product features, etc)
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
                  <p>Corporate news (our life, launch of new services, etc)</p>
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
  )
}

PrivacySettings.propTypes = {
  mailSettings: PropTypes.object,
  setMailSettings: PropTypes.func,
}

export default PrivacySettings
