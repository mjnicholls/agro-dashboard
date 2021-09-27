import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { getMailPrefs, invoiceEdit } from '../../services/api/personalAccountAPI';
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
import UserSettings from './UserSettings';
import UserPassword from './UserPassword';
import PrivacySettings from './PrivacySettings';
import InvoiceSettings from './InvoiceInfo';
import DeleteAccount from './DeleteAccount';
import ReactBSAlert from "react-bootstrap-sweetalert";



  const AccountSettings = ({}) => {

    const dispatch = useDispatch();
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
        <div className="content">
          <Row>
            <Col md="6">
              <UserSettings name={name} setName={setName} username={username} setUserName={setUsername} />
            </Col>
            <Col md="6">
              <UserPassword />
            </Col>
          </Row>
          <Row>
            <Col>
              <PrivacySettings mailSettings={mailSettings} setMailSettings={setMailSettings} />
              </Col>
          </Row>

          <Row>
            <Col>
            <Button
                            className="btn-link btn-icon btn-neutral"
                            color="primary"
                            title="Delete"
                            type="button"
                            onClick={(e) => {
                              htmlAlert(true);
                              e.stopPropagation();
                            }}
                          >
                           
                          </Button>
           
            </Col>
          </Row>
          <Row>
            <Col>
            <InvoiceSettings invoiceSettings={invoiceSettings} setInvoiceSettings={setInvoiceSettings} />
            </Col>
         
          </Row>

          <Row>
            <Col>
            
            </Col>
          </Row>
        </div>
      </>
    );
  
  }
  
  export default AccountSettings;
