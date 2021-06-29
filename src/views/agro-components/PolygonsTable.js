/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import PropTypes from "prop-types";
import {toDate} from '../../utils/DateTime'
import classnames from "classnames";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledTooltip
} from "reactstrap";



const PolygonsTable = (props) => {

  const [bodyData, setBodyData] = React.useState(props.data);
  React.useEffect(() => {
    setBodyData(props.data)
  }, [props.data])


  const [column, setColumn] = React.useState({
    name: -1,
    order: "",
  });

  const count = props.data.length;

  const sortTable = (key) => {
    let order = "";
    if (
      (column.name === key && column.order === "desc") ||
      column.name !== key
    ) {
      order = "asc";
      bodyData.sort((a, b) =>
        a[key] > b[key]
          ? 1
          : a[key] < b[key]
          ? -1
          : 0
      );
    } else if (column.name === key && column.order === "asc") {
      order = "desc";
      bodyData.sort((a, b) =>
        a[key] > b[key]
          ? -1
          : a[key] < b[key]
          ? 1
          : 0
      );
    }
    setBodyData(bodyData);
    setColumn({
      name: key,
      order: order,
    });
  };

  const filterTable = (key) => {
    if (key) {
      let lowerKey = key.toLowerCase();
      let newBodyData = props.data.filter(polygon => (polygon.name.toLowerCase().includes(lowerKey) || polygon.area.toString().includes(lowerKey)))
      setBodyData(newBodyData)
    } else {
      setBodyData(props.data)
    }
  }

  return (
    <>
      <div className="pagination-top">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>

            <Input
              type="email"
              // value={filterValue || ""}
              onChange={(e) => {
                filterTable(e.target.value || undefined); // Set undefined to remove the filter entirely
              }}
              placeholder={`Search ${count} polygons...`}
              style={{maxWidth: "300px"}}
            />
            <Button color="primary" style={{minWidth: "200px"}}>Create polygon</Button>
        </div>
      </div>

      <Table className="tablesorter" responsive>
        <thead className="text-primary">
          <tr>
            <th></th>
            <th
              className={
                classnames(
                  "header",
                  { headerSortDown: column.name === "name" && column.order === "asc" },
                  { headerSortUp: column.name === "name" && column.order === "desc" },
                )
              }
              key="name"
              onClick={() => sortTable("name")}>Name</th>
            <th
              className={
                classnames(
                  "header",
                  { headerSortDown: column.name === "area" && column.order === "asc" },
                  { headerSortUp: column.name === "area" && column.order === "desc" },
                )
              }
              key="area"
              onClick={() => sortTable("area")}
            >Area</th>
            <th
              className={
                classnames(
                  "header",
                  { headerSortDown: column.name === "created_at" && column.order === "asc" },
                  { headerSortUp: column.name === "created_at" && column.order === "desc" },
                )
              }
              key="createdAt"
              onClick={() => sortTable("created_at")}
            >Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bodyData.map((polygon, index) => {
            return (
              <tr key={`row_` + index} onClick={() => console.log("clicked row with polygon id", polygon.id)} >
                  <td>Shape</td>
                  <td>
                    <Link to={"/admin/polygon/" + polygon.id}>
                      {polygon.name}
                      </Link>
                    </td>
                  <td>{polygon.area}ha</td>
                  <td>{toDate(polygon.created_at)}</td>

                <td className="text-right">
                  <Button
                    className="btn-link btn-icon btn-neutral"
                    color="success"
                    id="tooltip618296632"
                    size="sm"
                    title="Refresh"
                    type="button"
                  >
                    <i className="tim-icons icon-pencil" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip618296632"
                  >
                    Edit polygon
                  </UncontrolledTooltip>
                  <Button
                    className="btn-link btn-icon btn-neutral"
                    color="danger"
                    id="tooltip707467505"
                    size="sm"
                    title="Delete"
                    type="button"
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </Button>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip707467505"
                  >
                    Delete polygon
                  </UncontrolledTooltip>
                </td>
              </tr>

            );
          })}

        </tbody>
      </Table>
      {bodyData.length > 10 && <div className="pagination-bottom">
        <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        aria-label="Previous"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span aria-hidden={true}>
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-double-left"
                          />
                        </span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        aria-label="Next"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span aria-hidden={true}>
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-double-right"
                          />
                        </span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
      </div>}
    </>
  );
};

PolygonsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      area: PropTypes.number,
      createdAt: PropTypes.number,
      pixels: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number,  PropTypes.number)
      )
    })
  ).isRequired,
};

export default PolygonsTable;
