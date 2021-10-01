import React, { useEffect, useState } from "react";
import { getPolygons } from '../../services/api/personalAccountAPI';

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

     let header = ["Name", "Polygon ID", "Source", "Created At", "Deleted At", "Area" ]
     
      if (polygons.length) {
            let csv = polygons.map(polygons =>
         `${polygons.name}, ${polygons.poly_id}, ${polygons.source}, ${polygons.created_at.slice(0,11)}, ${polygons.deleted_at  || ''}, ${polygons.area}`
      );
        csv.unshift(header + '');
        res = `"${csv.join('"\n"').replace(/','/g, '","')}"`
        console.log("res", res)
      } else {
        return header
      }

      return res;
    }

    
   /*
      const header = ["Name", "Polygon ID", "Source", "Created At", "Deleted At", "Area" ];
      if (polygons.length) {
      let csv = polygons.map(polygons =>
         `${polygons.name}, ${polygons.poly_id}, ${polygons.roles}, ${polygons.source}, ${polygons.created_at}, ${polygons.deleted_at}, ${polygons.area}`
      );
      console.log("res", res)
      return header.concat(csv).join("\n");
      }
      else {

      }
    
      }
      */

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
