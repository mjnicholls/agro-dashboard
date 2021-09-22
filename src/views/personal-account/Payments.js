import React, {useEffect, useState} from 'react';
import { getInvoices } from '../../services/api/personalAccountAPI'
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

  const InvoiceList = () => {

    const [data, setData] = useState([]);

    const refreshData = () => {
        getInvoices()
          .then(res => {
            setData(res)
          })
          .catch(err => {console.log(err)})
      }
    
      useEffect(() => {
        refreshData();
      }, [])
  
      const view = () => {

      }
  
    return (
      <>
        <div className="content">

          <Row>
            <Col className="mb-0" md="12" mt="20">
              <Card>
                <CardHeader>
                  <CardTitle tag="h3">Invoices</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="mb-0">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Service</th>
                       <th>Date</th>  
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
  
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.invoice_number}>
                          <td>
                            <code>{item.invoice_number}</code>
                          </td>
                          <td>{item.description}</td>
                           <td>{item.date.substring(0,21)}</td>
                           <td>{item.amount}</td>
                          <td className="text-right">
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="success"
                            id="tooltip618296632"
                            size="sm"
                            title="Download"
                            type="button"
                       // onClick=
                          >
                            <i className="tim-icons icon-cloud-download-93" />
                          </Button>
                        
                          <Button
                            className="btn-link btn-icon btn-neutral"
                            color="success"
                            id="tooltip618296632"
                            size="sm"
                            title="Edit"
                            type="View"
                           // onClick
                          >
                            <i className="tim-icons icon-map-big" />
                          </Button>
                          </td>
                        </tr>
                      ))}
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
  
  export default InvoiceList;
