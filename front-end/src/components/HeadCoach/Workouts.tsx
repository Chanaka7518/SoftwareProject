import { useState } from "react";
import { Col, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Requests from "./Requests";
import Ongoing from "./Ongoing";
import CompletedWorkouts from "./CompletedWorkouts";

const DISPLAY_SIZES = {
  xs: { span: 24, offset: 0 },
  sm: { span: 16, offset: 4 },
  md: { span: 16, offset: 4 },
  lg: { span: 16, offset: 4 },
  xl: { span: 16, offset: 4 },
};

const Workouts = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("requests");

  return (
    <div>
      <Menu
        style={{
          width: "100%",
          color: "black",
          backgroundColor: "rgba(0,255,0,0.25)",
          minWidth: "200px",
          display: "flex",
          justifyContent: "center",
        }}
        mode="horizontal"
        defaultSelectedKeys={["requests"]}
        onClick={({ key }) => {
          setSelectedMenu(key);
        }}
        items={[
          { label: "Requests", key: "requests" },
          { label: "Ongoing", key: "ongoing" },
          { label: "Completed", key: "Completed" },
        ]}
      ></Menu>

      <Content style={{ margin: "0 10px 10px 10px" }}>
        <Col {...{ ...DISPLAY_SIZES }}>
          {selectedMenu === "requests" && <Requests />}
          {selectedMenu === "ongoing" && <Ongoing />}
          {selectedMenu === "Completed" && <CompletedWorkouts />}
        </Col>
      </Content>
    </div>
  );
};

export default Workouts;
