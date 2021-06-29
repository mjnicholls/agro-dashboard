import React from "react";
import {
  Table,
} from "reactstrap";

const PolygonList = () => {

  const polygonsData = [
   {
      "id":"60b8bbdc380af3307b6b1569",
      "name":"New name",
      "area":13.9,
      "pixels":[
         [
            1,
            15.655367231652077
         ],
         [
            7,
            39.65536723165208
         ],
         [
            49,
            29.65536723165208
         ],
         [
            38,
            10.655367231652077
         ],
         [
            1,
            15.655367231652077
         ]
      ],
      "createdAt":1622719452
   },
   {
      "id":"60a4d02fb5d889f77b0302ad",
      "name":"First polygon",
      "area":16,
      "pixels":[
         [
            21.98585135794544,
            1
         ],
         [
            3.985851357945439,
            44
         ],
         [
            28.98585135794544,
            49
         ],
         [
            45.985851357945435,
            6
         ],
         [
            21.98585135794544,
            1
         ]
      ],
      "createdAt":1621413935
   }
]

   return (
     <Table responsive>
        <tbody>
          {polygonsData.map(polygon => (
            <tr>
              <td>
                <div className="flag">
                  <img
                    alt="..."
                    src={require("assets/img/US.png").default}
                  />
                </div>
              </td>
              <td>{polygon.name}</td>
              <td className="text-right">{polygon.area}</td>
            </tr>
          ))}
        </tbody>
      </Table>
  );
}

export default PolygonList;