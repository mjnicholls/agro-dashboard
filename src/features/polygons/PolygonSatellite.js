import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from 'react-redux'
import {NdviChart, SoilChart} from '../../views/charts/index'
import SatelliteImagesList from '../../views/agro-components/SatelliteImagesList'
import LeafletMapComponent from '../../views/maps/LeafletMapSatellite'

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import {
  useParams
} from "react-router-dom";
import {fetchPolygons} from "./actions";
import {getSatelliteImagesList} from "../../services/api/polygonApi";
import SatelliteLayersDropdown from "../../views/agro-components/SatelliteLayersDropdown";

const selectPolygons = state => state.polygons;
const selectPolygon = polygonId => state => {
  return state.polygons.find(polygon => polygon.id === polygonId)
}


const PolygonSatellite = () => {

  let { id } = useParams();
  const dispatch = useDispatch();
  const polygon = useSelector(selectPolygon(id));
  const [apiCallCount, setApiCallCount] = React.useState(0);
  const startDateImages = 946684800;
  // const startDateImages = 1278086414; //  2010

  if (!polygon && !apiCallCount) {
    dispatch(fetchPolygons());
    setApiCallCount(1)
  }
  const polygons = useSelector(selectPolygons);

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
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0, 0, 0);
    let startDate = Math.round(monthAgo.getTime() / 1000)
    let endDate = Math.round(now.getTime() / 1000)
    return [startDate, endDate]
  }, [currentHour])

  React.useEffect(() => {
    if (selectedPolygon) {
      const [startDate, endDate] = defaultDates;
      getSatelliteImagesList(selectedPolygon.id, startDateImages, endDate)
        .then(response => {
          if (response && response.length) {
            response.reverse();
            setImages(response);
            // set first image
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

  const [bigChartData, setbigChartData] = React.useState("data1");

  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  const selectImage = (image) => {
    setSelectedImage(image)
  }

  const [startDate, endDate] = defaultDates;

  return ( selectedPolygon ?
    <>
      <div className="content">
        <Row>
          <Col lg="12">
                <Row>
                  <Col md="8" style={{maxHeight: "250px !important"}}>
                    <SatelliteLayersDropdown selectedLayer={selectedLayer} layers={layers} setLayer={setSelectedLayer} />
                    <LeafletMapComponent
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
                  <Col className="ml-auto mr-auto" md="4">
                    <Card>
                      <CardHeader>All polygons</CardHeader>
                      <CardBody>
                        <Table responsive>
                        <tbody>
                          {polygons.map(polygon => (
                            <tr
                              className="clickable-table-row"
                              onClick={() => {setSelectedPolygon(polygon)}}
                              key={`polygon_${polygon.id}`} >
                              <td>
                                <div>
                                  Shape
                                </div>
                              </td>
                              <td>{polygon.name}</td>
                              <td className="text-right">{polygon.area.toFixed(1)}ha</td>
                            </tr>
                          ))}
                        </tbody>
                    </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              {/*</CardBody>*/}
            {/*</Card>*/}
          </Col>
        </Row>

        <Row>
          <Col xs="12">
            {(selectedPolygon && startDate && endDate) &&
            <NdviChart
              id={selectedPolygon.id}
              name={selectedPolygon.name}
              defaultStartDate={startDate}
              defaultEndDate={endDate}
             />}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">{selectedPolygon.name}</h5>
                    <CardTitle tag="h2">Soil data</CardTitle>
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
                          active: bigChartData === "data1",
                        })}
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Accounts
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
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Purchases
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Sessions
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {(startDate && endDate) && <SoilChart
                    id={selectedPolygon.id}
                    defaultStartDate={startDate}
                    defaultEndDate={endDate}
                  />}
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </> :
    <>
      <div className="content">
        <Row>
          <Col lg="12">Fetching...</Col>
        </Row>
      </div>
    </>
  );
};

export default PolygonSatellite;
