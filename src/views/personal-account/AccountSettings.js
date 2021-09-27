import React, {useEffect, useState} from 'react';
import { getMailPrefs, deleteAcct } from '../../services/api/personalAccountAPI';
// reactstrap components
import { Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row
 } from "reactstrap";
import UserSettings from './UserSettings';
import UserPassword from './UserPassword';
import PrivacySettings from './PrivacySettings';
import InvoiceSettings from './InvoiceInfo';
import DeleteAccount from './DeleteAccount';
import ReactBSAlert from "react-bootstrap-sweetalert";
import UnitsToggle from '../agro-components/UnitsToggle';

  const AccountSettings = ({}) => {

    const hideAlert = () => {
      setAlert(null);
    };
  
    const [data, setData] = useState([]);
    const [alert, setAlert] = React.useState(null);

    const refreshData = () => {
      deleteAcct()
        .then(res => {
          setData(res)
        })
        .catch(err => {console.log(err)})
    }

    const [invoiceSettings, setInvoiceSettings] = useState({
      type: "individual",
      title: "",
      first_name: "",
      last_name: "",
      country: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      postal_code: "",
      state: "",
      phone: "",
      vat_id: ""
    });

    const [mailSettings, setMailSettings] = useState({
      news: false,
      product: false,
      system: false
    })

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
      getMailPrefs()
        .then(res => {
          setName(res.user.full_name)
          setUsername(res.user.username)
          setMailSettings(res.mailing)
          if (Object.keys(res.invoice_info).length) {
            setInvoiceSettings(res.invoice_info)
          }
         })
    }, [])


    const htmlAlert = (acctNo) => {
      setAlert(
        <ReactBSAlert
          customClass="agro-alert"
          title={"Delete Account"}
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          showConfirm={false}
        >
          { <DeleteAccount
            acctNo={acctNo}
            close={hideAlert}
          /> }
        </ReactBSAlert>
      );
    };


    return (
      <>
        {alert}
        <div className="content">
          <Row>
            <Col md="6">
              <UserSettings
                name={name}
                setName={setName}
                username={username}
                setUserName={setUsername}
              />
            </Col>
            <Col md="6">
              <UserPassword />
            </Col>
          </Row>
          <Row>
            <Col>
              <PrivacySettings
                mailSettings={mailSettings}
                setMailSettings={setMailSettings}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Delete Your Account</CardTitle>
                </CardHeader>
                <CardBody>
                  <Button
                         className="btn-fill"
                         color="danger"
                         type="submit"
                    title="Delete"
                    disabled={data.length === 1}
                    onClick={(e) => {
                      htmlAlert(false);
                      e.stopPropagation();
                    }}
                  >
                    Delete
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <InvoiceSettings
                invoiceSettings={invoiceSettings}
                setInvoiceSettings={setInvoiceSettings}
              />
            </Col>
          </Row>
       
          <Row>
            <Col>
            <Card>
            <CardHeader>
                  <CardTitle tag="h4">Dashboard Settings</CardTitle>
                </CardHeader>
                <CardBody>
                  <Label className="mb-3">Toggle Units: </Label>
            <UnitsToggle />
            </CardBody>
            </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  
  }
  
  export default AccountSettings;
