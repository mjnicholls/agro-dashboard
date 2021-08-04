import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import HourlyChart from "./HourlyChart";
import DailyChart from "./DailyChart";
import Toggler from "../agro-components/Toggler";
import classnames from "classnames";
import ChartContainer from "./ui/ChartContainer";
const selectOneCall = state => state.onecall;
const selectUnits = state => state.units.isMetric;

const HourlyDailyChart = () => {

  const [isHourly, setIsHourly] = useState(true);
  const isMetric = useSelector(selectUnits);
  const onecall = useSelector(selectOneCall);

  return (
    <Card className={classnames("card-chart daily-chart ", {
          "hourly-chart": isHourly && onecall.data,
        })}>
        <CardHeader>
          <Row>
            <Col className="text-left" xs="6">
              <h5 className="card-category">Forecast</h5>
              <CardTitle tag="h2">{isHourly ? "Hourly" : "Daily"}</CardTitle>
            </Col>
            <Col xs="6">
              <Toggler
                isActive={isHourly}
                setIsActive={setIsHourly}
                labelOne="Hourly"
                labelTwo="Daily"
              />
            </Col>
          </Row>
        </CardHeader>
      <CardBody>
        <ChartContainer
            isLoading={onecall.isLoading}
            error={onecall.error} >
            {isHourly ?
              <HourlyChart isMetric={isMetric} data={onecall.data}/>
              : <DailyChart isMetric={isMetric} data={onecall.data} />}
        </ChartContainer>
      </CardBody>
    </Card>
  )
}

export default HourlyDailyChart;