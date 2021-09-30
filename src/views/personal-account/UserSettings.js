import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserName
} from '../../services/api/personalAccountAPI';
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


const UserSettings = ({name, setName, username, setUserName, email}) => {

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
          <CardTitle tag="h4">Personal information</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <label>Username</label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                className={error ? "danger-border" : ""}
              />
            </FormGroup>
            <label>Full Name</label>
            <FormGroup>
              <Input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={error ? "danger-border" : ""}
              />
            </FormGroup>
            <label>Email address</label>
            <FormGroup>
              <Input type="email" value={email} disabled />
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter className="text-right">
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