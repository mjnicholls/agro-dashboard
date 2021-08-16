import React from 'react';

import {
  Col,
  Row,
} from "reactstrap";

import MapBoxDraw from './maps/MapBoxDraw';
import PolygonCreateCard from './small-cards/PolygonCreateCard';


const PolygonNew = () => {
  /** Draw a new polygon, give it a name */

  const [geoJson, setGeoJson] = React.useState(null);
  const [area, setArea] = React.useState("");
  const [intersection, setIntersection] = React.useState(false);
  const [mode, setMode] = React.useState("draw");

  const drawRef = React.useRef(null);

  const resetMap = () => {
    const data = drawRef.current.getAll();
    data.features.forEach((f) => {
      if (f.geometry.type === 'Polygon') {
        drawRef.current.delete(f.id);
      }
    })
    setArea(null);
    setGeoJson(null);

  }

  const blockMapResetting = () => {
    return !drawRef.current || !drawRef.current.getAll().features.length
  }

  return (
     <>
      <div className="content">
        <Row>
          <Col md="8">
            <MapBoxDraw
              setArea={setArea}
              setGeoJson={setGeoJson}
              setIntersection={setIntersection}
              drawRef={drawRef}
              mode={mode}
            />
          </Col>
          <Col md="4">
            <PolygonCreateCard
              area={area}
              geoJson={geoJson}
              intersections={intersection}
              mode={mode}
              setMode={setMode}
              resetMap={resetMap}
            />
          </Col>
        </Row>
      </div>
     </>
  )
}

export default PolygonNew