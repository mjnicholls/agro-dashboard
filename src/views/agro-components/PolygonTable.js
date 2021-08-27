import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';

import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Table,
  UncontrolledTooltip
} from "reactstrap";

import AgroPagination from './AgroPagination';
import PolygonEdit from './PolygonEdit';
import PolygonDelete from './PolygonDelete';
import ReactBSAlert from "react-bootstrap-sweetalert";
import Shape from "./Shape";
import {toDate} from "../../utils/dateTime";
import {setActivePoly} from "../../features/state/actions";


const PolygonTable = ({data, setActivePolygon}) => {

  const dispatch = useDispatch();

  const [tableData, setTableData] = useState(data);
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [column, setColumn] = React.useState({
    name: -1,
    order: "",
  });

  const itemsPerPage = 10;

  useEffect(() => {
    setTableData(data);
  }, [data])

  const filterTable = (keyword) => {
    if (keyword) {
      let keywordLower = keyword.toLowerCase();
      let filteredData = data.filter(el => el.name.toLowerCase().includes(keywordLower));
      setTableData(filteredData);
    } else {
      setTableData(data)
    }
  }

  const sortTable = (key) => {
    let order = "";
    if (
      (column.name === key && column.order === "desc") ||
      column.name !== key
    ) {
      order = "asc";
      tableData.sort((a, b) =>
        a[key] > b[key]
          ? 1
          : a[key] < b[key]
          ? -1
          : 0
      );
    } else if (column.name === key && column.order === "asc") {
      order = "desc";
      tableData.sort((a, b) =>
        a[key] > b[key]
          ? -1
          : a[key] < b[key]
          ? 1
          : 0
      );
    }
    setTableData(tableData);
    setColumn({
      name: key,
      order: order,
    });
  };

  useEffect(() => {
    setPageData(tableData.slice(page * itemsPerPage, (page + 1) * itemsPerPage));
  }, [tableData, page, column])

  const hideAlert = () => {
    setAlert(null);
  };

  const htmlAlert = (polygon, isEdit) => {
    setAlert(
      <ReactBSAlert
        customClass="agro-alert"
        title={isEdit ? "Edit polygon" : "Delete polygon"}
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        showConfirm={false}
      >
        {isEdit ? <PolygonEdit
          polygon={polygon}
          close={hideAlert}
        /> : <PolygonDelete
          polygon={polygon}
          close={hideAlert}
        />}
      </ReactBSAlert>
    );
  };

  return (
    <>
      {alert}
      <Card>
        <CardHeader>
          <div className="horizontal-container justify">
            <Input
                type="email"
                onChange={(e) => {
                  filterTable(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${data.length} polygon${data.length > 1 ? "s" : ""}...`}
                style={{maxWidth: "300px"}}
              />
              <Link to="/dashboard/new-polygon" >
                <Button  color="primary" style={{minWidth: "200px"}}>Create polygon</Button>
              </Link>
          </div>
        </CardHeader>
        <CardBody>
          <Table className="polygon-table tablesorter">
            <thead>
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
                  onClick={() => sortTable("name")}>Name
                </th>
                <th
                  className={
                    classnames(
                      "header",
                      { headerSortDown: column.name === "created_at" && column.order === "asc" },
                      { headerSortUp: column.name === "created_at" && column.order === "desc" },
                    )
                  }
                  key="created_at"
                  onClick={() => sortTable("created_at")}
                >Created</th>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((polygon) =>
                (<tr key={"polygon_" + polygon.id}
                     onClick={() => dispatch(setActivePoly(polygon))}>
                  <td><Shape polygon={polygon} /></td>
                  <td>{polygon.name}</td>
                  <td>{toDate(polygon.created_at)}</td>
                  <td>{polygon.area.toFixed(2)}ha</td>
                  <td className="text-right">
                    <Button
                      className="btn-link btn-icon btn-neutral"
                      color="success"
                      id="tooltip618296632"
                      size="sm"
                      title="Refresh"
                      type="button"
                      onClick={(e) => {
                        htmlAlert(polygon, true);
                        e.stopPropagation();
                      }}
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
                      onClick={(e) => {
                        htmlAlert(polygon, false);
                        e.stopPropagation();
                      }}
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
                </tr>))}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <AgroPagination
            count={tableData.length}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </CardFooter>
      </Card>
    </>
  )
}

export default PolygonTable;