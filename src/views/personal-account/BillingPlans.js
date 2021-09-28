import React, {useEffect, useState} from 'react';
// reactstrap components
import { Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
 } from "reactstrap";
 

  const BillingPlans = () => {

    return (
      <>
        <div className="content">
          <Row>
            <Col><h1>Billing Plans</h1></Col>
          </Row>
          <Row>
            <Col className="mb-0" md="12" mt="20">
              <Card>
                <CardBody>
                  <Table className="mb-2">
                      
                  <thead>
                      <tr>
                        <th colSpan="5"><h4>Satellite data (imageries and statistics by polygon)</h4></th>
                    
                      </tr>
                    </thead>
                    <tbody>
                   <tr className="mb-2">
                   <td>Total area of created polygons</td>
                        <td>1,000 ha</td>
                       <td>4,000 ha</td>  
                        <td>20,000 ha</td>
                        <td>Unlimited</td>
                   </tr>

                   <tr>
                   <td>API calls <b>per minute</b> to satellite data</td>
                        <td>&#60; 60</td>
                       <td>&#60; 600</td>  
                        <td>&#60; 3,000</td>
                        <td>Unlimited</td>
                   </tr>

                   <tr>
                   <td>Number of created polygons per month</td>
                        <td>&#60; 10</td>
                       <td>Unlimited</td>  
                       <td>Unlimited</td>  
                        <td>Unlimited</td>
                   </tr>

                   <tr>
                   <td>Satellite imagery (NDVI, EVI, True color, False color)</td>
                        <td>All available data (сheck)</td>
                       <td>All available data (сheck) + total archive on request</td>  
                       <td>All available data (сheck) + total archive on request</td>  
                        <td>Total archive</td>
                   </tr>

                   <tr>
                   <td>Price for exceeded area (learn more)</td>
                        <td>Unavailable</td>
                       <td>£0.02 per each 1 ha</td>  
                       <td>£0.01 per each 1 ha</td>  
                        <td>Flexible discount system</td>
                   </tr>

                   <tr>
                   <td>Satellite imagery (NDVI, EVI, True color, False color)</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                        <td rowSpan="3"><p>We provide a customised service and extended data range under this plan. You can receive data for broader areas, get access to more in-depth archives, ask for an almost unlimited number of requests per minute, etc.</p>

<p>Write to us with your requirements, and we will prepare a relevant offer for you.</p></td>
                   </tr>

                   <tr>
                   <td>NDVI history for a polygon</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                      
                   </tr>

                   <tr>
                   <td>Current soil temperature and moisture</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

                   <tr>
                   <td>Historical soil temperature and moisture</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

            
                    </tbody>
                  </Table>
                </CardBody>
            
              </Card>
            </Col>
          </Row>

        
          <Row>
            <Col className="mb-0" md="12" mt="20">
              <Card>
                <CardBody>
                  <Table className="mb-2">
                      
                  <thead>
                      <tr>
                        <th colSpan="5"><h4>Weather data</h4></th>
                    
                      </tr>
                    </thead>
                    <tbody>
                   <tr className="mb-2">
                   <td>API calls <b>per day</b> to current and forecast weather data</td>
                   <td>&#60; 500</td>
                       <td>&#60; 1,000</td>  
                        <td>&#60; 10,000</td>
                        <td>Unlimited</td>
                   </tr>

                   <tr>
                   <td>API calls <b>per day</b> to historical weather data</td>
                        <td>—</td>
                       <td>&#60; 500</td>  
                        <td>&#60; 5,000</td>
                        <td>Unlimited</td>
                   </tr>

                   <tr>
                   <td>Historical weather data depth</td>
                        <td>—</td>
                       <td>1 Year</td>  
                       <td>1 Year</td>  
                        <td>Total archive</td>
                   </tr>

                   <tr>
                   <td>Current weather data</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                        <td rowSpan="8"><p>We provide a customised service and extended data range under this plan. You can receive data for broader areas, get access to more in-depth archives, ask for an almost unlimited number of requests per minute, historical data depth, etc.</p>

<p>Write to us with your requirements, and we will prepare a relevant offer for you.</p></td>
                   </tr>

                   <tr>
                   <td>5 day/3 hour weather forecast</td>
                   <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

                   <tr>
                   <td>Historical weather data</td>
                        <td>—</td>
                       <td>✔</td>  
                       <td>✔</td>  
                
                   </tr>

                   <tr>
                   <td>Accumulated precipitation</td>
                        <td>—</td>
                       <td>✔</td>  
                       <td>✔</td>  
                      
                   </tr>

                   <tr>
                   <td>Accumulated temperature</td>
                        <td>—</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

                   <tr>
                   <td>Current UV index</td>
                        <td>✔</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

                   <tr>
                   <td>Forecast UV index</td>
                        <td>—</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

                   <tr>
                   <td>Historical UV index</td>
                        <td>—</td>
                       <td>✔</td>  
                       <td>✔</td>  
                   </tr>

            
                    </tbody>
                  </Table>
                </CardBody>
            
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  
  }
  
  export default BillingPlans;
