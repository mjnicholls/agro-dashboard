import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateUserName,
  updatePassword,
} from '../../services/api/personalAccountAPI';
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

 const userEmailSelector = state => state.auth.user.email;

 const userSettings = ({}) => {

    const userEmail = useSelector(userEmailSelector);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

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
               dispatch(notifySuccess("Username updated"))
             }).catch(error => {
               dispatch(notifyError("Error updating name " + error.message))
             })
         
         }

             // password update 

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
                    <Input type="email" value={userEmail} disabled />
                  </FormGroup>
                  <label>Username</label>
                  <FormGroup>
                    <Input
                      type="email"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                  <label>Full Name</label>
                  <FormGroup>
                    <Input
                      type="email"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className={error ? "danger-border" : ""}
                    />
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
                    <Input
                      type="password"
                      autoComplete="off"
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                  <label>Confirm New Password</label>
                  <FormGroup>
                    <Input
                      type="password"
                      autoComplete="off"
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      className={error ? "danger-border" : ""}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={confirmPassUpdate}
                >
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        </div>
        </>
  );

 }


 export default userSettings;