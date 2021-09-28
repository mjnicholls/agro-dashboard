import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMailing, getMailPrefs
} from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
// reactstrap components
import { Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Label,
  FormGroup,
  Input,
 } from "reactstrap";



const PrivacySettings = ({ mailSettings, setMailSettings }) => {

  const dispatch = useDispatch();

  // send mail prefs

  const handleCheckBoxClick = (key, value) => {
      let newObj = Object.assign({}, mailSettings);
      newObj[key] = value;
      setMailSettings(newObj);
  }

  const confirmMailSettings = () => {

    updateMailing(mailSettings).then(
      () => { 
        dispatch(notifySuccess("Settings updated"))
      }).catch(error => {
        dispatch(notifyError("Error updating settings " + error.message))
      })
    }
  

  return (
    <Card>
                <CardHeader>
                  <CardTitle tag="h4">Privacy Settings</CardTitle>
                </CardHeader>
                <CardBody>
                  <Label sm="12">Please indicate what news from our company you would like to receive by email:</Label>
                  <Col className="checkbox-radios" sm="12">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            handleCheckBoxClick("news", e.target.checked);
                          }}
                          checked={mailSettings.news}
                        />
                        <span className="form-check-sign" />
                        System news (API usage alerts, system updates, temporary
                        system shutdown, etc)
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            handleCheckBoxClick("product", e.target.checked);
                          }}
                          checked={mailSettings.product}
                        />
                        <span className="form-check-sign" />
                        Product news (changes to prices, new product features,
                        etc)
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            handleCheckBoxClick("system", e.target.checked);
                          }}
                          checked={mailSettings.system}
                        />
                        <span className="form-check-sign" />
                        Corporate news (our life, launch of new services, etc)
                      </Label>
                    </FormGroup>
                  </Col>
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
            
  );
}


export default PrivacySettings;