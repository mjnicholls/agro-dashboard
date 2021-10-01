import React, { useEffect, useState } from "react";
import { getPolygons } from '../../services/api/personalAccountAPI';
//import { useDispatch } from 'react-redux';
//import { notifyError, notifySuccess } from "../../features/notifications/actions";

import {
  Button,
} from "reactstrap";
//import { array } from "prop-types";
//import booleanPointInPolygon from "@turf/boolean-point-in-polygon";


const ExportPolygon = () => {

    const [polygons, setPolygons] = useState([]);

    useEffect(() => {
      getData();
    }, []);

    const getData = () => {
      getPolygons()
        .then(res => {
          setPolygons(res.polygons)
        })
        .catch((err) => {
          console.log(err);
        });
    };


    const arrayToCSV = (polygons) => {
      let res = "";

      // make different order
      // Name
      // Polygon ID
      // Source
      // Created at
      // Deleted at
      // Area

      // header human readable

      // dates: 19 May 2021

      // escape " (double quotes)

      // replace nulls with ""

      if (polygons.length) {
        let csv = polygons.map(row => Object.values(row));
        csv.unshift(Object.keys(polygons[0]));
        res = `"${csv.join('"\n"').replace(/,/g, '","')}"`
        console.log("res", res)
      } else {
        // if we don't have polygons, we should return header
      }

      return res;
    }


    const downLoad = () => {
        const polygonData = arrayToCSV(polygons)
        const blob = new Blob([polygonData], { type: 'text/csv' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'polygons.csv'
        document.body.appendChild(link);
        link.click()
        document.body.removeChild(link);
    }


    
    return (
            <Button
              className="btn-neutral"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={downLoad}
            >
              Download
            </Button>
        
      )
    }

export default ExportPolygon;