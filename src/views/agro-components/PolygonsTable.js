import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {toDate} from '../../utils/dateTime'
import classnames from "classnames";
import { Link } from "react-router-dom";
import PolygonDeleteModal from "./PolygonDeleteModal";
import PolygonEditModal from "./PolygonEditModal";
import PolygonsPagination from "./AgroPagination"
import Shape from "./Shape";

import {
  Button,
  Card,
  CardBody,
  Input,
  Table,
  UncontrolledTooltip
} from "reactstrap";


const PolygonsTable = ({data, setActivePolygon, setSelectedPolygon}) => {

  const [selectedPolygon, selectPolygon] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [bodyData, setBodyData] = useState(data);
  const [column, setColumn] = React.useState({
    name: -1,
    order: "",
  });

  const itemsPerPage = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    setBodyData(data)
  }, [data])


  const prepareEdit = (polygon) => {
    selectPolygon(polygon);
    setModalEdit(true);
  }


  const cancelEdit = () => {
    setModalEdit(false);
    selectPolygon(null);
  };

  const prepareDelete = (polygon) => {
    selectPolygon(polygon);
    setModalDelete(true);
  }

  const cancelDelete = () => {
    setModalDelete(false);
    selectPolygon(null);
  };

  const totalPolygons = () => {
    return bodyData.length || 0
  }

  const totalArea = () => {
    if (bodyData.length) {
      let x = bodyData.reduce((a,b) => ({area: a.area + b.area}))
      return x.area.toFixed(2)
    }
    return 0
  }

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
      let newBodyData = data.filter(polygon => (polygon.name.toLowerCase().includes(lowerKey) || polygon.area.toString().includes(lowerKey)))
      setBodyData(newBodyData)
    } else {
      setBodyData(data)
    }
  }

  const TableRow = ({polygon}) => {
    return (
    <tr
      onMouseEnter={() => {setActivePolygon(polygon.id)}}
      onMouseLeave={() => {setActivePolygon(null)}}
      onClick={() => {setSelectedPolygon(polygon)}}
    >
      <td style={{width: "55px"}}>
        <Shape polygon={polygon} />
      </td>
      <td>
        {/*<Link to={"/admin/polygon/" + polygon.id}>*/}
          {polygon.name}
        {/*</Link>*/}
      </td>
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
            e.preventDefault();
            prepareEdit(polygon);
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
          onClick={() => prepareDelete(polygon)}
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
  )}

  return (
    <>
      <PolygonDeleteModal
        isOpen={modalDelete}
        close={cancelDelete}
        polygon={selectedPolygon}
      />
      <PolygonEditModal
        isOpen={modalEdit}
        close={cancelEdit}
        polygon={selectedPolygon}
      />
      <Card>
        <CardBody>
          <div className="pagination-top">
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <Input
                type="email"
                onChange={(e) => {
                  filterTable(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${totalPolygons()} polygons...`}
                style={{maxWidth: "300px"}}
              />
              <Link to="/admin/create" >
                <Button  color="primary" style={{minWidth: "200px"}}>Create polygon</Button>
              </Link>
            </div>
          </div>
          <Table className="tablesorter polygon-table" responsive>
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
                  key="createdAt"
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
              {bodyData.slice((page-1)*itemsPerPage, page*itemsPerPage).map((polygon) =>
                <TableRow key={"row_" + polygon.id} polygon={polygon} />)}
              <tr>
                <td colSpan={2} className="td-total">Total</td>
                <td className="td-total text-left">{totalPolygons()} polygons</td>
                <td className="td-total text-left" colSpan={2}>{totalArea()} ha</td>
              </tr>
            </tbody>
          </Table>
          <PolygonsPagination
            count={bodyData.length}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </CardBody>
      </Card>
    </>
  );
};

PolygonsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      area: PropTypes.number,
      createdAt: PropTypes.number,
      pixels: PropTypes.array
    })
  ).isRequired,
};

export default PolygonsTable;
