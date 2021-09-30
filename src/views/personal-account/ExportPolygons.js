import React, { useEffect, useState } from "react";
import { getPolygons } from '../../services/api/personalAccountAPI';
//import { useDispatch } from 'react-redux';
//import { notifyError, notifySuccess } from "../../features/notifications/actions";

import {
  Button,
} from "reactstrap";
//import { array } from "prop-types";
//import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const ExportPolygon = ({ data, csv }) => {
    

    const [polygons] = useState({
        area: "",
        created_at: new Date(),
        deleted_at: "",
        name: "",
        poly_id: "",
        source: "",
      });

      const getData = () => {
        getPolygons()
          .then(console.log()).catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
        getData();
      }, []);
    
{/*    const arrayToCSV = (polygons) => {
        csv = polygons.map(row => Object.values(row));
        csv.unshift(Object.keys(polygons[0]));
        return `"${csv.join('"\n"').replace(/,/g, '","')}"`;
      }


      const downLoad = () => {
          const polygonData = arrayToCSV(polygons)
          const blob = new Blob([polygonData], { type: 'text/csv' })
          const link = document.CreateElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'polygons.csv'
          document.body.appendChild(link);
          link.click()
          document.body.removeChild(link);
      }

*/}
    
    return (
    
            <Button
              className="btn-neutral"
              color="default"
              data-dismiss="modal"
              type="button"
              //onClick={downLoad}
            >
              Download
            </Button>
        
      )
    }

export default ExportPolygon;