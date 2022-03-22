import React from 'react'

import classnames from 'classnames'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap'

const Register = () => {
  const [state, setState] = React.useState({})
  React.useEffect(() => {
    document.body.classList.toggle('register-page')
    return function cleanup() {
      document.body.classList.toggle('register-page')
    }
  })
  return (
    <>
      <div className="content">
        <Container>
          <Row>
            <Col className="ml-auto" md="5">
              <div className="info-area info-horizontal mt-5">
                <div className="icon icon-warning">
                  <i className="tim-icons icon-wifi" />
                </div>
                <div className="description">
                  <h3 className="info-title">
                    Satellite imagery archive and wide range of vegetation
                    indices{' '}
                  </h3>
                  <p className="description">
                    NDVI, EVI, DSWI, NDWI, NRI, etc. lets you identify anomalies
                    in your fields and plan further actions, and with a
                    historical NDVI chart you can analyze the changes in the
                    level of vegetation in your field through the seasons
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-primary">
                  <i className="tim-icons icon-triangle-right-17" />
                </div>
                <div className="description">
                  <h3 className="info-title">
                    Accurate and generous weather data
                  </h3>
                  <p className="description">
                    Weather data for your fields include the current state of
                    weather, soil, weather alerts; weather forecasts with hourly
                    and daily granulation; resent temperature, precipitation,
                    soil temperature and moisture; accumulated temperature and
                    precipitation
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-info">
                  <i className="tim-icons icon-trophy" />
                </div>
                <div className="description">
                  <h3 className="info-title">Advanced crop recognition </h3>
                  <p className="description">
                    Based on Machine Learning technology, it will help you to
                    get information on the state of fields, their crops and NDVI
                    statistics through the years.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-info">
                  <i className="tim-icons icon-trophy" />
                </div>
                <div className="description">
                  <h3 className="info-title">Advanced crop recognition </h3>
                  <p className="description">
                    Based on Machine Learning technology, it will help you to
                    get information on the state of fields, their crops and NDVI
                    statistics through the years.
                  </p>
                </div>
              </div>
            </Col>
            <Col className="mr-auto" md="7">
              <Card className="card-register card-white">
                <CardHeader>
                  <CardImg
                    alt="..."
                    src={require('assets/img/card-primary.png').default}
                  />
                  <CardTitle tag="h4">Register</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form">
                    <InputGroup
                      className={classnames({
                        'input-group-focus': state.nameFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        onFocus={(e) => setState({ ...state, nameFocus: true })}
                        onBlur={(e) => setState({ ...state, nameFocus: false })}
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        'input-group-focus': state.emailFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-email-85" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="text"
                        onFocus={(e) =>
                          setState({ ...state, emailFocus: true })
                        }
                        onBlur={(e) =>
                          setState({ ...state, emailFocus: false })
                        }
                      />
                    </InputGroup>
                    <InputGroup
                      className={classnames({
                        'input-group-focus': state.passFocus,
                      })}
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-lock-circle" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="text"
                        onFocus={(e) => setState({ ...state, passFocus: true })}
                        onBlur={(e) => setState({ ...state, passFocus: false })}
                      />
                    </InputGroup>
                    <FormGroup check className="text-left">
                      <Label check>
                        <Input type="checkbox" />
                        <span className="form-check-sign" />I agree to the{' '}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          terms and conditions
                        </a>
                        .
                      </Label>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className="btn-round"
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Register
