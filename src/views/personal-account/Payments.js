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
 import AgroPagination from '../agro-components/AgroPagination';

  const InvoiceList = () => {

    const [data, setData] = useState([]);

    const [page, setPage] = useState(0);
    const [pageData, setPageData] = useState([]);

    const itemsPerPage = 10;

    // update the data

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


    // pagination
    useEffect(() => {
      setPageData(data.slice(page * itemsPerPage, (page + 1) * itemsPerPage));
    }, [data, page])



    return (
      <>
        <div className="content">
          <Row>
            <Col><h1>Invoices</h1></Col>
          </Row>
          <Row>
            <Col className="mb-0" md="12" mt="20">
              <Card>
                {/*<CardHeader>*/}
                  {/*<CardTitle tag="h3">Invoices</CardTitle>*/}
                {/*</CardHeader>*/}
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
                      {pageData.map((item) => (
                        <tr key={item.invoice_number}>
                          <td>
                            <code>{item.invoice_number}</code>
                          </td>
                          <td>{item.description}</td>
                           {/*<td>{item.date.substring(0,21)}</td>*/}
                           <td>{item.date.replace(" UTC", "")}</td>
                           <td>{item.amount}</td>
                          <td className="text-right">
                            <a role="button" href={item.pdf_link} download className="btn-link btn-icon btn-neutral">
                              <i className="tim-icons icon-cloud-download-93" />
                              </a>
                            <a role="button" href={item.view_link} target="_blank" className="btn-link btn-icon btn-neutral">
                              <i className="tim-icons icon-map-big" />
                              </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
                <AgroPagination
            count={data.length}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  
  }
  
  export default InvoiceList;
