import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {toDate} from '../utils/DateTime';
import SatellitePage from './SatellitePage';
import WeatherPage from './WeatherPage';
import SatelliteImagesList from './agro-components/SatelliteImages'
import MapBox from './maps/MapBoxTiles'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
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
import classNames from "classnames";

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

  const [selectedPolygon, setSelectedPolygon] = useState(polygon);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLayer, setSelectedLayer] = useState({value: "truecolor", label: "True Color"});
  const [images, setImages] = useState([]);
  const [layers, setLayers] = useState([]);

  const [isSatellitePage, setIsSatellitePage] = useState(true);

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
                  <CardBody style={{maxHeight: "450px", overflow: "scroll", marginBottom: "10px"}}>
                    <Table responsive>
                    <tbody>
                      {polygons.map(polygon => (
                        <tr
                          className={classNames("clickable-table-row", {
                            "table-danger": polygon.id === selectedPolygon.id,
                          })}
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
          <Col sm="6">
            <CardTitle tag="h2">{selectedPolygon.name}, {selectedPolygon.area.toFixed(2)}ha</CardTitle>
          </Col>
          <Col sm="6">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
              >
                <Button
                  color="info"
                  id="0"
                  size="sm"
                  tag="label"
                  className={classNames("btn-simple", {
                    active: isSatellitePage,
                  })}
                  onClick={() => setIsSatellitePage(true)}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Satellite
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-single-02" />
                  </span>
                </Button>
                <Button
                  color="info"
                  id="1"
                  size="sm"
                  tag="label"
                  className={classNames("btn-simple", {
                    active: !isSatellitePage,
                  })}
                  onClick={() => setIsSatellitePage(false)}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Weather
                  </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
        </Row>

        {isSatellitePage ?
          <SatellitePage
            selectedPolygon={selectedPolygon}
            startDate={startDate}
            endDate={endDate}
            userLevel={userLevel}
          /> : <WeatherPage polygon={selectedPolygon} />
        }
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
