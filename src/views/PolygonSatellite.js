import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toDate} from '../utils/DateTime'
import { AccumulatedChart, NdviChart, SoilChart } from './charts/index'
import SatelliteImagesList from './agro-components/SatelliteImages'
import MapBox from './maps/MapBoxTiles'
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";

import {
  Link,
  useParams
} from "react-router-dom";
import { fetchPolygons } from "../features/polygons/actions";
import { getSatelliteImagesList } from "../services/api/polygonApi";
import SatelliteLayersDropdown from "./agro-components/SatelliteLayers";
import { userLevels } from '../config'

const selectPolygons = state => state.polygons;
const selectPolygon = polygonId => state => {
  return state.polygons.find(polygon => polygon.id === polygonId)
}
const tariffSelector = state => state.auth.user.tariff;


const PolygonSatellite = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const polygon = useSelector(selectPolygon(id));
  const [apiCallCount, setApiCallCount] = React.useState(0);

  if (!polygon && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }
  const polygons = useSelector(selectPolygons);
  const tariff = useSelector(tariffSelector);

  const userLevel = userLevels[tariff];

  const [selectedPolygon, setSelectedPolygon] = React.useState(polygon);
  const [selectedImage, setSelectedImage] = React.useState();
  const [selectedLayer, setSelectedLayer] = React.useState({value: "truecolor", label: "True Color"});
  const [images, setImages] = React.useState([]);
  const [layers, setLayers] = React.useState([]);

  React.useEffect(() => {
    setSelectedPolygon(polygon)
  }, [polygon])

  let currentHour = new Date().getUTCHours();

  const defaultDates = React.useMemo(() => {
    let now = new Date();
    let monthAgo = new Date(now.getTime());
    monthAgo.setMonth(monthAgo.getMonth() - 6);
    monthAgo.setHours(0, 0, 0, 0);
    let startDate = monthAgo.getTime();
    let endDate = now.getTime();
    return [startDate, endDate]
  }, [currentHour])

  React.useEffect(() => {
    if (selectedPolygon) {
      getSatelliteImagesList(selectedPolygon.id)
        .then(response => {
          if (response && response.length) {
            response.reverse();
            setImages(response);
            setSelectedImage(response[0]);
          }
        })
        .catch(err => {console.log(err)})
    }
  }, [selectedPolygon])

  React.useEffect(() => {
    if (selectedImage) {
      let selectedLayerInstance;
      let newLayers = Object.keys(selectedImage.tile).map(layer => {
        let label;
        if (layer === 'truecolor') {
          label = 'True Color';
          selectedLayerInstance = {
            value: layer,
            label: label
          }
        } else if (layer === 'falsecolor') {
          label = 'False Color'
        } else {
          label = layer.toUpperCase()
        }
        return {
          value: layer,
          label: label
        }
      })
      if (!selectedLayer) {
        selectedLayerInstance = newLayers[0]
      }
      setSelectedLayer(selectedLayerInstance);
      setLayers(newLayers);
    }
  }, [selectedImage])

  const selectImage = (image) => {
    setSelectedImage(image)
  }

  const [startDate, endDate] = defaultDates;

  return ( selectedPolygon ?
    <>
      <div className="content">
        <Row>
          <Col>
            <Row>
              <Col md="8" style={{maxHeight: "250px !important"}}>
                <SatelliteLayersDropdown
                  selectedLayer={selectedLayer}
                  layers={layers}
                  setLayer={setSelectedLayer}
                />
                <MapBox
                  polygon={selectedPolygon}
                  selectedImage={selectedImage}
                  selectedLayer={selectedLayer}
                />
                <SatelliteImagesList
                    images={images}
                    selectedImage={selectedImage}
                    selectImage={selectImage}
                  />
              </Col>
              <Col md="4" className="ml-auto mr-auto">
                <Card>
                  <CardHeader style={{display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                      <div>All polygons</div>
                      <Link to="/admin/dashboard">
                        <i className="tim-icons icon-bullet-list-67 text-info" />
                      </Link>
                  </CardHeader>
                  <CardBody style={{maxHeight: "450px", overflow: "scroll"}}>
                    <Table responsive>
                    <tbody>
                      {polygons.map(polygon => (
                        <tr
                          className="clickable-table-row"
                          onClick={() => {setSelectedPolygon(polygon)}}
                          key={`polygon_${polygon.id}`} >
                          <td>{polygon.name}</td>
                          <td className="text-right">{polygon.area.toFixed(1)}ha</td>
                          <td>{toDate(polygon.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            {(selectedPolygon && startDate && endDate) &&
            <NdviChart
              id={selectedPolygon.id}
              name={selectedPolygon.name}
              defaultStartDate={startDate}
              defaultEndDate={endDate}
             />}
          </Col>
        </Row>
        { (userLevel && startDate && endDate) && <Row>
          <Col>
            <SoilChart
              id={selectedPolygon.id}
              defaultStartDate={startDate}
              defaultEndDate={endDate}
              userLevel={userLevel}
            />
          </Col>
        </Row> }
        { userLevel && <Row>
          <Col>
            <AccumulatedChart
              id={selectedPolygon.id}
            />
          </Col>
        </Row> }
      </div>
    </> :
    <>
      <div className="content">
        <Row>
          <Col>Fetching...</Col>
        </Row>
      </div>
    </>
  );
};

export default PolygonSatellite;
