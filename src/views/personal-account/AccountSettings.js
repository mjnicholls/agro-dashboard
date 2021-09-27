import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateUserName,
  updatePassword,
  updateMailing,
  getMailPrefs,
  invoiceEdit
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
import UserSettings from './UserSettings';
import UserPassword from './UserPassword';

const userEmailSelector = state => state.auth.user.email;

  const AccountSettings = ({ }) => {

    const userEmail = useSelector(userEmailSelector);

    const dispatch = useDispatch();

    const [isIndividual, setIsIndividual] = useState(true);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null)
    const [type, setType] = useState('');
    const [vat_id, setVat_id] = useState('');
    const [country, setCountry] = useState('')
    const [address_line_1, setAddress_line_1] = useState('');
    const [address_line_2, setAddress_line_2] = useState('');
    const [city, setCity] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
      getMailPrefs()
        .then(res => {
          setMailSettings(res.mailing);
          setName(res.user.full_name)
          setUsername(res.user.username)
         })
    }, [])

    const [mailSettings, setMailSettings] = useState({
      news: false,
      product: false,
      system: false
    })

    // send mail prefs

    const handleCheckBoxClick = (key, value) => {
        let newObj = Object.assign({}, mailSettings);
        newObj[key] = value;
        setMailSettings(newObj);
    }

    // update invoice

    const confirmInvoice = () => {

      setError(null);
      if 
       (!type.length &&
        !country.length && 
        !address_line_1.length && 
        !city.length && 
        !postal_code.length && 
        !phone.length) {
         setError(true);
         dispatch(notifyError("Cannot be empty"));
         return
       }

       let data = {
        type: type,
        vat_id: vat_id,
        country: country,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city, 
        postal_code: postal_code,
        state: state,
        phone: phone

      }
   
         invoiceEdit(data).then(
           () => { 
             dispatch(notifySuccess("Invoice updated"))
           }).catch(error => {
             dispatch(notifyError("Error updating name " + error.message))
           })
       
       }

    // password update 

  const confirmMailSettings = () => {

    updateMailing(mailSettings).then(
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
              <UserSettings name={name} setName={setName} username={username} setUserName={setUsername} />
            </Col>
            <Col md="6">
              <UserPassword />
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
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            handleCheckBoxClick("news", e.target.checked);
                          }}
                          checked={mailSettings.news}
                        />
                        <span className="form-check-sign" />
                        System news (API usage alert, system update, temporary
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
                        Product news (change to price, new product features,
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
                        Corporate news (our life, the launch of a new service,
                        etc)
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

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Delete Account</CardTitle>
                </CardHeader>
                <CardBody>
                  <Label>Are you sure you want to delete your account?</Label>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-fill"
                    color="danger"
                    type="button"
                    //  onClick={}
                  >
                    Delete Account
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        id="exampleRadios3"
                        name="legalForm"
                        type="radio"
                        checked={isIndividual}
                        onChange={() => setIsIndividual(true)}
                      />
                      <span className="form-check-sign" />
                      Individual .

                    </Label>
              
                    <Label check>
                      <Input
                        id="exampleRadios4"
                        name="legalForm"
                        type="radio"
                        checked={!isIndividual}
                        onChange={() => setIsIndividual(false)}
                      />
                      <span className="form-check-sign" />
                      Organisation
                    </Label>
                  </FormGroup>

                  {isIndividual?     <Card>
                <CardHeader>
                  <CardTitle tag="h4">Invoice Info</CardTitle>
                  <CardTitle tag="h4">Organisation</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal">
                    <Row>
                      <Label md="3">Organisation *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            className={error ? "danger-border" : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">VAT ID</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setVat_id(e.target.value)}
                            value={vat_id}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Country *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            style={{ color: "black" }}
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            className={error ? "danger-border" : ""}
                          >
                            {/*   <option selected value="blank"></option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antartica">Antarctica</option>
                            <option value="Antigua and Barbuda">
                              Antigua and Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegowina">
                              Bosnia and Herzegowina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei Darussalam">
                              Brunei Darussalam
                            </option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo">
                              Congo, the Democratic Republic of the
                            </option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                            <option value="Croatia">Croatia (Hrvatska)</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="France Metropolitan">
                              France, Metropolitan
                            </option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard and McDonald Islands">
                              Heard and Mc Donald Islands
                            </option>
                            <option value="Holy See">
                              Holy See (Vatican City State)
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">
                              Iran (Islamic Republic of)
                            </option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Democratic People's Republic of Korea">
                              Korea, Democratic People's Republic of
                            </option>
                            <option value="Korea">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao">
                              Lao People's Democratic Republic
                            </option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">
                              Lebanon
                            </option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">
                              Libyan Arab Jamahiriya
                            </option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">
                              Macedonia, The Former Yugoslav Republic of
                            </option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">
                              Micronesia, Federated States of
                            </option>
                            <option value="Moldova">
                              Moldova, Republic of
                            </option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">
                              Saint Kitts and Nevis
                            </option>
                            <option value="Saint LUCIA">Saint LUCIA</option>
                            <option value="Saint Vincent">
                              Saint Vincent and the Grenadines
                            </option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">
                              Sao Tome and Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">
                              Slovakia (Slovak Republic)
                            </option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia">
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value="Span">Spain</option>
                            <option value="SriLanka">Sri Lanka</option>
                            <option value="St. Helena">St. Helena</option>
                            <option value="St. Pierre and Miguelon">
                              St. Pierre and Miquelon
                            </option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard">
                              Svalbard and Jan Mayen Islands
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syrian Arab Republic</option>
                            <option value="Taiwan">
                              Taiwan, Province of China
                            </option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">
                              Tanzania, United Republic of
                            </option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">
                              Trinidad and Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos">
                              Turks and Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Viet Nam</option>
                            <option value="Virgin Islands (British)">
                              Virgin Islands (British)
                            </option>
                            <option value="Virgin Islands (U.S)">
                              Virgin Islands (U.S.)
                            </option>
                            <option value="Wallis and Futana Islands">
                              Wallis and Futuna Islands
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Yemen">Yemen</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option> */}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Address Line 1 *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setAddress_line_1(e.target.value)}
                            value={address_line_1}
                            className={error ? "danger-border" : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Address Line 2</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setAddress_line_2(e.target.value)}
                            value={address_line_2}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">City *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                            className={error ? "danger-border" : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Postcode *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setPostal_code(e.target.value)}
                            value={postal_code}
                            className={error ? "danger-border" : ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">State</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setState(e.target.value)}
                            value={state}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Phone *</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input
                            type="text"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row></Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Form className="form-horizontal">
                    <Row>
                      <Label md="3" />
                      <Col md="9">
                        <Button
                          className="btn-fill"
                          color="primary"
                          type="submit"
                          onClick={confirmInvoice}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardFooter>
              </Card> 
              
              :  
              
              <Card>
              <CardHeader>
                <CardTitle tag="h4">Invoice Info</CardTitle>
                <CardTitle tag="h4">Individual</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal">
                  <Row>
                    <Label md="3">Title *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          style={{ color: "black" }}
                        >
                          <option selected value="blank"></option>
                          <option value="Mr">Mr</option>
                          <option value="Miss">Miss</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                          <option value="Dr">Dr</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">First Name *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Last Name *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Country *</Label>
                    <Col md="9">
                      <FormGroup>
                        {/*      <Input type="select" name="select" id="exampleSelect" style={{ color:"black" }}>
                        <option selected value="blank"></option>
                          <option value="Afghanistan">Afghanistan</option>
                          <option value="Albania">Albania</option>
                          <option value="Algeria">Algeria</option>
                          <option value="American Samoa">
                            American Samoa
                          </option>
                          <option value="Andorra">Andorra</option>
                          <option value="Angola">Angola</option>
                          <option value="Anguilla">Anguilla</option>
                          <option value="Antartica">Antarctica</option>
                          <option value="Antigua and Barbuda">
                            Antigua and Barbuda
                          </option>
                          <option value="Argentina">Argentina</option>
                          <option value="Armenia">Armenia</option>
                          <option value="Aruba">Aruba</option>
                          <option value="Australia">Australia</option>
                          <option value="Austria">Austria</option>
                          <option value="Azerbaijan">Azerbaijan</option>
                          <option value="Bahamas">Bahamas</option>
                          <option value="Bahrain">Bahrain</option>
                          <option value="Bangladesh">Bangladesh</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Belarus">Belarus</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Belize">Belize</option>
                          <option value="Benin">Benin</option>
                          <option value="Bermuda">Bermuda</option>
                          <option value="Bhutan">Bhutan</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Bosnia and Herzegowina">
                            Bosnia and Herzegowina
                          </option>
                          <option value="Botswana">Botswana</option>
                          <option value="Bouvet Island">Bouvet Island</option>
                          <option value="Brazil">Brazil</option>
                          <option value="British Indian Ocean Territory">
                            British Indian Ocean Territory
                          </option>
                          <option value="Brunei Darussalam">
                            Brunei Darussalam
                          </option>
                          <option value="Bulgaria">Bulgaria</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="Burundi">Burundi</option>
                          <option value="Cambodia">Cambodia</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Canada">Canada</option>
                          <option value="Cape Verde">Cape Verde</option>
                          <option value="Cayman Islands">
                            Cayman Islands
                          </option>
                          <option value="Central African Republic">
                            Central African Republic
                          </option>
                          <option value="Chad">Chad</option>
                          <option value="Chile">Chile</option>
                          <option value="China">China</option>
                          <option value="Christmas Island">
                            Christmas Island
                          </option>
                          <option value="Cocos Islands">
                            Cocos (Keeling) Islands
                          </option>
                          <option value="Colombia">Colombia</option>
                          <option value="Comoros">Comoros</option>
                          <option value="Congo">Congo</option>
                          <option value="Congo">
                            Congo, the Democratic Republic of the
                          </option>
                          <option value="Cook Islands">Cook Islands</option>
                          <option value="Costa Rica">Costa Rica</option>
                          <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                          <option value="Croatia">Croatia (Hrvatska)</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Cyprus">Cyprus</option>
                          <option value="Czech Republic">
                            Czech Republic
                          </option>
                          <option value="Denmark">Denmark</option>
                          <option value="Djibouti">Djibouti</option>
                          <option value="Dominica">Dominica</option>
                          <option value="Dominican Republic">
                            Dominican Republic
                          </option>
                          <option value="East Timor">East Timor</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Egypt">Egypt</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Equatorial Guinea">
                            Equatorial Guinea
                          </option>
                          <option value="Eritrea">Eritrea</option>
                          <option value="Estonia">Estonia</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Falkland Islands">
                            Falkland Islands (Malvinas)
                          </option>
                          <option value="Faroe Islands">Faroe Islands</option>
                          <option value="Fiji">Fiji</option>
                          <option value="Finland">Finland</option>
                          <option value="France">France</option>
                          <option value="France Metropolitan">
                            France, Metropolitan
                          </option>
                          <option value="French Guiana">French Guiana</option>
                          <option value="French Polynesia">
                            French Polynesia
                          </option>
                          <option value="French Southern Territories">
                            French Southern Territories
                          </option>
                          <option value="Gabon">Gabon</option>
                          <option value="Gambia">Gambia</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Germany">Germany</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Gibraltar">Gibraltar</option>
                          <option value="Greece">Greece</option>
                          <option value="Greenland">Greenland</option>
                          <option value="Grenada">Grenada</option>
                          <option value="Guadeloupe">Guadeloupe</option>
                          <option value="Guam">Guam</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Guinea-Bissau">Guinea-Bissau</option>
                          <option value="Guyana">Guyana</option>
                          <option value="Haiti">Haiti</option>
                          <option value="Heard and McDonald Islands">
                            Heard and Mc Donald Islands
                          </option>
                          <option value="Holy See">
                            Holy See (Vatican City State)
                          </option>
                          <option value="Honduras">Honduras</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Hungary">Hungary</option>
                          <option value="Iceland">Iceland</option>
                          <option value="India">India</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Iran">
                            Iran (Islamic Republic of)
                          </option>
                          <option value="Iraq">Iraq</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Israel">Israel</option>
                          <option value="Italy">Italy</option>
                          <option value="Jamaica">Jamaica</option>
                          <option value="Japan">Japan</option>
                          <option value="Jordan">Jordan</option>
                          <option value="Kazakhstan">Kazakhstan</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Kiribati">Kiribati</option>
                          <option value="Democratic People's Republic of Korea">
                            Korea, Democratic People's Republic of
                          </option>
                          <option value="Korea">Korea, Republic of</option>
                          <option value="Kuwait">Kuwait</option>
                          <option value="Kyrgyzstan">Kyrgyzstan</option>
                          <option value="Lao">
                            Lao People's Democratic Republic
                          </option>
                          <option value="Latvia">Latvia</option>
                          <option value="Lebanon">
                            Lebanon
                          </option>
                          <option value="Lesotho">Lesotho</option>
                          <option value="Liberia">Liberia</option>
                          <option value="Libyan Arab Jamahiriya">
                            Libyan Arab Jamahiriya
                          </option>
                          <option value="Liechtenstein">Liechtenstein</option>
                          <option value="Lithuania">Lithuania</option>
                          <option value="Luxembourg">Luxembourg</option>
                          <option value="Macau">Macau</option>
                          <option value="Macedonia">
                            Macedonia, The Former Yugoslav Republic of
                          </option>
                          <option value="Madagascar">Madagascar</option>
                          <option value="Malawi">Malawi</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="Maldives">Maldives</option>
                          <option value="Mali">Mali</option>
                          <option value="Malta">Malta</option>
                          <option value="Marshall Islands">
                            Marshall Islands
                          </option>
                          <option value="Martinique">Martinique</option>
                          <option value="Mauritania">Mauritania</option>
                          <option value="Mauritius">Mauritius</option>
                          <option value="Mayotte">Mayotte</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Micronesia">
                            Micronesia, Federated States of
                          </option>
                          <option value="Moldova">
                            Moldova, Republic of
                          </option>
                          <option value="Monaco">Monaco</option>
                          <option value="Mongolia">Mongolia</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Myanmar">Myanmar</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Nauru">Nauru</option>
                          <option value="Nepal">Nepal</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Netherlands Antilles">
                            Netherlands Antilles
                          </option>
                          <option value="New Caledonia">New Caledonia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Nicaragua">Nicaragua</option>
                          <option value="Niger">Niger</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Niue">Niue</option>
                          <option value="Norfolk Island">
                            Norfolk Island
                          </option>
                          <option value="Northern Mariana Islands">
                            Northern Mariana Islands
                          </option>
                          <option value="Norway">Norway</option>
                          <option value="Oman">Oman</option>
                          <option value="Pakistan">Pakistan</option>
                          <option value="Palau">Palau</option>
                          <option value="Panama">Panama</option>
                          <option value="Papua New Guinea">
                            Papua New Guinea
                          </option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Peru">Peru</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Pitcairn">Pitcairn</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Puerto Rico">Puerto Rico</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Reunion">Reunion</option>
                          <option value="Romania">Romania</option>
                          <option value="Russia">Russian Federation</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Saint Kitts and Nevis">
                            Saint Kitts and Nevis
                          </option>
                          <option value="Saint LUCIA">Saint LUCIA</option>
                          <option value="Saint Vincent">
                            Saint Vincent and the Grenadines
                          </option>
                          <option value="Samoa">Samoa</option>
                          <option value="San Marino">San Marino</option>
                          <option value="Sao Tome and Principe">
                            Sao Tome and Principe
                          </option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Seychelles">Seychelles</option>
                          <option value="Sierra">Sierra Leone</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Slovakia">
                            Slovakia (Slovak Republic)
                          </option>
                          <option value="Slovenia">Slovenia</option>
                          <option value="Solomon Islands">
                            Solomon Islands
                          </option>
                          <option value="Somalia">Somalia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="South Georgia">
                            South Georgia and the South Sandwich Islands
                          </option>
                          <option value="Span">Spain</option>
                          <option value="SriLanka">Sri Lanka</option>
                          <option value="St. Helena">St. Helena</option>
                          <option value="St. Pierre and Miguelon">
                            St. Pierre and Miquelon
                          </option>
                          <option value="Sudan">Sudan</option>
                          <option value="Suriname">Suriname</option>
                          <option value="Svalbard">
                            Svalbard and Jan Mayen Islands
                          </option>
                          <option value="Swaziland">Swaziland</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Syria">Syrian Arab Republic</option>
                          <option value="Taiwan">
                            Taiwan, Province of China
                          </option>
                          <option value="Tajikistan">Tajikistan</option>
                          <option value="Tanzania">
                            Tanzania, United Republic of
                          </option>
                          <option value="Thailand">Thailand</option>
                          <option value="Togo">Togo</option>
                          <option value="Tokelau">Tokelau</option>
                          <option value="Tonga">Tonga</option>
                          <option value="Trinidad and Tobago">
                            Trinidad and Tobago
                          </option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Turkey">Turkey</option>
                          <option value="Turkmenistan">Turkmenistan</option>
                          <option value="Turks and Caicos">
                            Turks and Caicos Islands
                          </option>
                          <option value="Tuvalu">Tuvalu</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Ukraine">Ukraine</option>
                          <option value="United Arab Emirates">
                            United Arab Emirates
                          </option>
                          <option value="United Kingdom">
                            United Kingdom
                          </option>
                          <option value="United States">United States</option>
                          <option value="United States Minor Outlying Islands">
                            United States Minor Outlying Islands
                          </option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Uzbekistan">Uzbekistan</option>
                          <option value="Vanuatu">Vanuatu</option>
                          <option value="Venezuela">Venezuela</option>
                          <option value="Vietnam">Viet Nam</option>
                          <option value="Virgin Islands (British)">
                            Virgin Islands (British)
                          </option>
                          <option value="Virgin Islands (U.S)">
                            Virgin Islands (U.S.)
                          </option>
                          <option value="Wallis and Futana Islands">
                            Wallis and Futuna Islands
                          </option>
                          <option value="Western Sahara">
                            Western Sahara
                          </option>
                          <option value="Yemen">Yemen</option>
                          <option value="Serbia">Serbia</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                        </Input>
                        */}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Address Line 1 *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Address Line 2</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">City *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Postcode *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">State</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label md="3">Phone *</Label>
                    <Col md="9">
                      <FormGroup>
                        <Input type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Form className="form-horizontal">
                  <Row>
                    <Label md="3" />
                    <Col md="9">
                      <Button
                        className="btn-fill"
                        color="primary"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardFooter>
            </Card>}

      
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
