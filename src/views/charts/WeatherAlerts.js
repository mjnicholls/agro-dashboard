import React from 'react';
import {capitalize} from "../../utils/utils";
import {formatDateTime} from '../../utils/dateTime';

import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const WeatherAlerts = ({ alerts, isLoading, error }) => {

  return (
    <Card className="card-stats">
      <CardHeader>
        {/*<Row>*/}
          {/*<Col xs="5">*/}
            {/*<div className="info-icon text-center icon-danger">*/}
              {/*<i className="tim-icons icon-alert-circle-exc" />*/}
            {/*</div>*/}
          {/*</Col>*/}
          {/*<Col xs="7">*/}
            {/*<div className="numbers">*/}
              {/*<p className="card-category">Weather</p>*/}
              {/*<CardTitle tag="h3">Alerts</CardTitle>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>*/}

        <Row>
          <Col className="text-left" sm="7">
            <h5 className="card-category">Weather</h5>
            <CardTitle tag="h2">Alerts</CardTitle>
          </Col>
        </Row>
      </CardHeader>
      <CardBody style={{maxHeight: "180px", overflow: "auto"}}>
        {isLoading ?
          <div className="chart-placeholder">Fetching data...</div> : error ?
          <div className="chart-placeholder">{error}</div> : (alerts && alerts.length) ?
            alerts.map(alert =>
              <>
                <p><i className="tim-icons icon-alert-circle-exc" style={{marginRight: "10px"}} />{capitalize(alert.event)}</p>
                <span>{formatDateTime(alert.start)} - {formatDateTime(alert.end)}</span>
                <p className="stats">{alert.description}</p>
                <span>{alert.sender_name}</span>
                <hr />
              </>
            ) : <div>No alerts</div> }
      </CardBody>
    </Card>
  )
}

export default WeatherAlerts;