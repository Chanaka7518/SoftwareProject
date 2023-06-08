import { Card, Col, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { CaretUpFilled } from "@ant-design/icons";

import { useAuthContext } from "../../Hooks/useAuthContext";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router";
import newRequest from "../../Utils/newRequest";

const OCPhoto: string = new URL(`./online-coaching.jpg`, import.meta.url).href;
const PTPhoto: string = new URL(`./personal-Training.jpg`, import.meta.url)
  .href;

const DISPLAY_SIZES_ROW = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};
const DISPLAY_SIZES_COL = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 8, offset: 0 },
  lg: { span: 5, offset: 0 },
  xl: { span: 5, offset: 0 },
};

const DISPLAY_SIZES_ROW_PACKAGE = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 24, offset: 0 },
  xl: { span: 24, offset: 0 },
};
const DISPLAY_SIZES_COL_PACKAGE = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 8, offset: 0 },
  lg: { span: 10, offset: 1 },
  xl: { span: 10, offset: 1 },
};

const DISPLAY_SIZES_COL_DATE_TIME = {
  xs: { span: 24, offset: 0 },
  sm: { span: 24, offset: 0 },
  md: { span: 24, offset: 0 },
  lg: { span: 23, offset: 0 },
  xl: { span: 23, offset: 0 },
};

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "left",
  // borderRight: "1px solid rgba(0,23,f,0.5)",
};

interface Props {
  setSelectedMenu: (value: string) => void;
}
const DashboardContent: React.FC<Props> = ({ setSelectedMenu }) => {
  const navigateTo = useNavigate();
  const { userData } = useAuthContext();
  let userId = userData?._id;

  const [images, setImages] = useState<string[]>([OCPhoto, PTPhoto]);

  const [totalRevenue, setTotalRevenue] = useState<number>(156234);
  const [totalAlfFee, setTotalAlfFee] = useState<number>(28456);
  const [withdrawableFee, setWithdrawableFee] = useState<number>(56347);
  const [totalOrders, setTotalOrders] = useState<number>(47);
  const [ordersCompleted, setOrdersCompleted] = useState<number>(35);
  const [ordersInProgress, setOrdersInProgress] = useState<number>(12);
  const [myTeam, setMyTeam] = useState<number>(12);

  const [fName, setFName] = useState<string>(userData.firstName);
  const [lName, setLName] = useState<string>(userData.lastName);

  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "10px",
        }}
      >
        <Col {...DISPLAY_SIZES_COL_DATE_TIME}>
          <Card
            style={{
              width: "100% ",
              display: "flex",
              justifyContent: "center",
              background: "#d3d3d3",
            }}
          >{`Hi ${fName} ${lName}`}</Card>
        </Col>
      </Row>
      {/*Row 1 */}
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
        {...DISPLAY_SIZES_ROW}
      >
        {/* //sales */}
        <Card style={{ width: "100%" }}>
          <Card.Grid
            hoverable
            style={gridStyle}
            onClick={() => navigateTo("/mysales")}
          >
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              Sales
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              $1245.67
            </Typography.Title>
            <Typography.Title
              style={{ color: "green", marginTop: "0px" }}
              level={4}
            >
              <CaretUpFilled />
              20% since last month
            </Typography.Title>
          </Card.Grid>
          {/* Clients */}
          <Card.Grid
            hoverable
            style={gridStyle}
            onClick={() => navigateTo("/myclients")}
          >
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              Clients
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              50
            </Typography.Title>
            <Typography.Title
              style={{ color: "green", marginTop: "0px" }}
              level={4}
            >
              <CaretUpFilled />
              10% since last month
            </Typography.Title>
          </Card.Grid>
          {/* Workouts */}
          <Card.Grid
            hoverable
            style={gridStyle}
            onClick={() => navigateTo("/workouts")}
          >
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              Wokouts
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              56
            </Typography.Title>
            <Typography.Title
              style={{ color: "green", marginTop: "0px" }}
              level={4}
            >
              <CaretUpFilled />
              12% since last month
            </Typography.Title>
          </Card.Grid>
          {/* My team */}
          <Card.Grid
            hoverable
            style={gridStyle}
            onClick={() => navigateTo("/myteam")}
          >
            <Typography.Title level={4} style={{ marginTop: "0px" }}>
              My Team
            </Typography.Title>
            <Typography.Title
              style={{ marginBottom: "0px", color: "#cad2c5" }}
              level={4}
            >
              12
            </Typography.Title>
          </Card.Grid>
        </Card>
      </Row>
      <Typography.Title>Packages</Typography.Title>
      {/* Packages */}
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Card
          hoverable
          style={{ width: "40%" }}
          cover={
            <img
              alt="Online Coaching"
              style={{ width: "100%", height: "auto" }}
              src={OCPhoto}
            />
          }
          onClick={() => {
            setSelectedMenu("onlineCoaching");
          }}
        >
          <Meta title="Online Coaching" />
        </Card>
        <Card
          hoverable
          style={{ width: "40%" }}
          cover={
            <img
              alt="Personal Training"
              style={{ width: "100%", height: "auto" }}
              src={PTPhoto}
            />
          }
          onClick={() => {
            setSelectedMenu("personalTraining");
          }}
        >
          <Meta title="Personal Training" />
        </Card>
      </Row>
    </div>
  );
};

//

export default DashboardContent;
