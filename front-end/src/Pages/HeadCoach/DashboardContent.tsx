import { Card, Col, Row, Typography, message } from "antd";
import React, { useState, useEffect } from "react";
import { CaretUpFilled } from "@ant-design/icons";
import "./Statistics-card.css";

import { useAuthContext } from "../../Hooks/useAuthContext";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router";
import newRequest from "../../Utils/newRequest";
import StatisticsCard from "./StatisticsCard";
import NewOrders from "./NewOrders";

const OCPhoto: string = new URL(`./online-coaching.jpg`, import.meta.url).href;
const PTPhoto: string = new URL(`./personal-Training.jpg`, import.meta.url)
  .href;

interface Props {
  setSelectedMenu: (value: string) => void;
}
const DashboardContent: React.FC<Props> = ({ setSelectedMenu }) => {
  const navigateTo = useNavigate();
  const { userData } = useAuthContext();

  const [userId, setUserId] = useState(userData?._id);
  const [images, setImages] = useState<string[]>([OCPhoto, PTPhoto]);

  const [workouts, setWorkouts] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [pendingOrders, setPendingOrders] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/users/coach/${userId}`, {});
        setWorkouts(res.data.totalSales);
        setRevenue(res.data.revenue);
        setPendingOrders(res.data.newOrders);
        console.log(res.data);
      } catch (err: any) {
        message.error(err.message);
      }
    };
    fetchData();
  }, []);

  const [viewOrders, setViewOrders] = useState<boolean>(false);
  return (
    <div>
      <Row>
        <StatisticsCard
          setViewOrders={setViewOrders}
          viewOrders={viewOrders}
          title="Sales Revenue"
          value={revenue}
          type="money"
        />
        <StatisticsCard
          viewOrders={viewOrders}
          setViewOrders={setViewOrders}
          title="Number of Sales"
          value={workouts}
          type="number"
        />
        <StatisticsCard
          viewOrders={viewOrders}
          setViewOrders={setViewOrders}
          title={"To Deliver"}
          value={pendingOrders.length}
          type="number"
        />
      </Row>
      <Row>{viewOrders && <NewOrders ordersToDeliver={pendingOrders} />}</Row>
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
