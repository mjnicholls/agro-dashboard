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
  Form,
  FormGroup,
  Input,
 } from "reactstrap";

const userEmailSelector = state => state.auth.user.email;

const UserSettings = ({name, setName, username, setUserName}) => {

  const userEmail = useSelector(userEmailSelector);

  const [error, setError] = useState(null);

  const dispatch = useDispatch();

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

  return (
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
                      onChange={(e) => setUserName(e.target.value)}
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
  );
}


export default UserSettings;