import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import ReactTable from "components/ReactTable/ReactTable.js";

const PolygonsReactTable = (props) => {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    let newData = props.data.map(item => {
      return [item.name, item.area, item.created_at]
    })
    setData(newData);

    console.log(newData)
  }, [props.data])


  // const [data, setData] = React.useState(
  //   dataTable.map((prop, key) => {
  //     return {
  //       id: key,
  //       name: prop[0],
  //       position: prop[1],
  //       office: prop[2],
  //       age: prop[3],
  //       actions: (
  //         // we've added some custom button actions
  //         <div className="actions-right">
  //           {/* use this button to add a like kind of action */}
  //           <Button
  //             onClick={() => {
  //               let obj = data.find((o) => o.id === key);
  //               alert(
  //                 "You've clicked LIKE button on \n{ \nName: " +
  //                   obj.name +
  //                   ", \nposition: " +
  //                   obj.position +
  //                   ", \noffice: " +
  //                   obj.office +
  //                   ", \nage: " +
  //                   obj.age +
  //                   "\n}."
  //               );
  //             }}
  //             color="info"
  //             size="sm"
  //             className={classNames("btn-icon btn-link like", {
  //               "btn-neutral": key < 5,
  //             })}
  //           >
  //             <i className="tim-icons icon-heart-2" />
  //           </Button>{" "}
  //           {/* use this button to add a edit kind of action */}
  //           <Button
  //             onClick={() => {
  //               let obj = data.find((o) => o.id === key);
  //               alert(
  //                 "You've clicked EDIT button on \n{ \nName: " +
  //                   obj.name +
  //                   ", \nposition: " +
  //                   obj.position +
  //                   ", \noffice: " +
  //                   obj.office +
  //                   ", \nage: " +
  //                   obj.age +
  //                   "\n}."
  //               );
  //             }}
  //             color="warning"
  //             size="sm"
  //             className={classNames("btn-icon btn-link like", {
  //               "btn-neutral": key < 5,
  //             })}
  //           >
  //             <i className="tim-icons icon-pencil" />
  //           </Button>{" "}
  //           {/* use this button to remove the data row */}
  //           <Button
  //             onClick={() => {
  //               var newdata = data;
  //               newdata.find((o, i) => {
  //                 if (o.id === key) {
  //                   // here you should add some custom code so you can delete the data
  //                   // from this component and from your server as well
  //                   data.splice(i, 1);
  //                   console.log(data);
  //                   return true;
  //                 }
  //                 return false;
  //               });
  //               setData(newdata);
  //             }}
  //             color="danger"
  //             size="sm"
  //             className={classNames("btn-icon btn-link like", {
  //               "btn-neutral": key < 5,
  //             })}
  //           >
  //             <i className="tim-icons icon-simple-remove" />
  //           </Button>{" "}
  //         </div>
  //       ),
  //     };
  //   })
  // );
  //

  return (
    <>
      <div className="content">
        <Col md={8} className="ml-auto mr-auto">
          <h2 className="text-center">All Polygons</h2>
        </Col>
        <Row className="mt-5">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">React Table</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name",
                    },
                    {
                      Header: "Area",
                      accessor: "area",
                    },
                    {
                      Header: "Created",
                      accessor: "created_at",
                    },
                    // {
                    //   Header: "Actions",
                    //   accessor: "actions",
                    //   sortable: false,
                    //   filterable: false,
                    // },
                  ]}
                  defaultPageSize={10}
                  // showPaginationTop
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PolygonsReactTable;
