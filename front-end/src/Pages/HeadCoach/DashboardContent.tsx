import { Card, Col, Row, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { CaretUpFilled } from "@ant-design/icons";
import "./Statistics-card.css";

import { useAuthContext } from "../../Hooks/useAuthContext";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router";
import newRequest from "../../Utils/newRequest";
import StatisticsCard from "./StatisticsCard";

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
  width: "33.3%",
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
      <Row>
        {/* onClick={() => navigateTo("/mysales")} */}
        <StatisticsCard title="Sales Revenue" value={50000} type="money" />
        {/* onClick={() => navigateTo("/myclients")} */}
        <StatisticsCard title="Number of Clients" value={100} type="number" />
        {/* onClick={() => navigateTo("/workouts")} */}
        <StatisticsCard title="Number of Workouts" value={500} type="number" />
      </Row>
      <Row>
        <p
          style={{
            width: "100% ",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgb(0, 240, 160)",
            padding: "5px",
            color: "white",
            fontSize: "24px",
          }}
        >
          Your Packages
        </p>
      </Row>
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
