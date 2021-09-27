import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  updatePassword } from '../../services/api/personalAccountAPI';
import { notifyError, notifySuccess } from "../../features/notifications/actions";
// reactstrap components
import { Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
 } from "reactstrap";


const UserPassword = () => {

  const [pass, setPass] = useState('');

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const confirmPassUpdate = () => {

    setError(null);

    if (!pass.length) {
       setError(true);
       dispatch(notifyError("Cannot be empty"));
       return
     }

    let passdata = {
      new_password: pass,
      new_password_confirm: pass,
    }

    updatePassword(passdata)
      .then(() => {
        dispatch(notifySuccess("Password updated"))
      })
      .catch(error => {
        dispatch(notifyError("Error updating password " + error.message))
      })
    }


  return (

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
  );
}


export default UserPassword;