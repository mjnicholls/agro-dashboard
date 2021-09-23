import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateUserName, updatePassword, updateMailing } from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
import { useSelector } from "react-redux";
// reactstrap components
import { Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
 } from "reactstrap";
import { bool } from 'prop-types';

 const userEmailSelector = state => state.auth.user.email;

  const AccountSettings = ({  }) => {

    const userEmail = useSelector(userEmailSelector);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [mail, setMail] = useState(false);
    
    
    const dispatch = useDispatch();

    const [error, setError] = useState(null)



  const confirmUpdate = () => {

   setError(null);

   if 
    (!username.length && !name.length) {
      setError(true);
      dispatch(notifyError("Cannot be empty"));
      return
    }

      let data = {
        new_username: username,
        new_full_name: name
      }

      updateUserName(data).then(
        () => { 
          dispatch(notifySuccess("Name updated"))
        }).catch(error => {
          dispatch(notifyError("Error updating name " + error.message))
        })
    
    }


    const confirmPassUpdate = () => {

      setError(null);
   
      if 
       (!pass.length) {
         setError(true);
         dispatch(notifyError("Cannot be empty"));
         return
       }

    let passdata = {
      new_password: pass,
      new_password_confirm: pass,
    }

    updatePassword(passdata).then(
      () => { 
        dispatch(notifySuccess("Password updated"))
      }).catch(error => {
        dispatch(notifyError("Error updating password " + error.message))
      })
    }

    const confirmMailSettings = () => {

      setMail(current => !current);

    let maildata = {
      news: false,
      product: false,
      system: false
    }



    updateMailing(maildata).then(
      () => { 
        dispatch(notifySuccess("Settings updated"))
      }).catch(error => {
        dispatch(notifyError("Error updating settings " + error.message))
      })
    }
  
   
    return (
      <>
        <div className="content">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Update Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Form action="#">
                <label>Email address</label>
                  <FormGroup>
                    <Input type="email" 
                    value={userEmail}
                    />
                  </FormGroup>
                  <label>Username</label>
                  <FormGroup>
                    <Input type="email" 
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    className={error ? "danger-border" : ""} />
                  </FormGroup>
                  <label>Full Name</label>
                  <FormGroup>
                    <Input type="email"
                    onChange={e => setName(e.target.value)}
                    value={name} 
                    className={error ? "danger-border" : ""}/>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
              <Button
          className="btn-fill"
          color="primary"
          type="button"
          onClick={confirmUpdate}
        >
          Update
        </Button>
              </CardFooter>
            </Card>
          </Col>

          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Update Password</CardTitle>
              </CardHeader>
              <CardBody>
                <Form action="#">
                  <label>New Password</label>
                  <FormGroup>
                    <Input type="password"
                    autoComplete="off"
                    onChange={e => setPass(e.target.value)}
                    value={pass} 
                    className={error ? "danger-border" : ""}/>
                  </FormGroup>
                  <label>Confirm New Password</label>
                  <FormGroup>
                    <Input type="password"
                    autoComplete="off"
                    onChange={e => setPass(e.target.value)}
                    value={pass} 
                    className={error ? "danger-border" : ""} />
                  </FormGroup>
              
                </Form>
              </CardBody>
              <CardFooter>
                <Button className="btn-fill"
                color="primary"
                type="submit"
                onClick={confirmPassUpdate}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
          </Row>
          <Row>
            <Col>
            <Card>
            <CardHeader>
                <CardTitle tag="h4">Privacy Settings</CardTitle>
              </CardHeader>
              <CardBody>
              <Label sm="12">Custom Checkboxes &amp; radios</Label>
                    <Col className="checkbox-radios" sm="12">
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox"
                           onChange={e => setMail(e.target.value)}
                           value={mail} />
                          <span className="form-check-sign" />
                          System news (API usage alert, system update, temporary system shutdown, etc)
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                      <Label check>
                          <Input type="checkbox"
                              onChange={e => setMail(e.target.value)}
                              value={mail} />
                          <span className="form-check-sign" />
                          Product news (change to price, new product features, etc)
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                      <Label check>
                          <Input type="checkbox"
                           onChange={e => setMail(e.target.value)}
                           value={mail} />
                          <span className="form-check-sign" />
                          Corporate news (our life, the launch of a new service, etc)
                        </Label>
                      </FormGroup>
                 
                    </Col>
                    </CardBody>
                    <CardFooter>
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
         
            </Col>
          </Row>
        </div>
      </>
    );
  
  }
  
  export default AccountSettings;
