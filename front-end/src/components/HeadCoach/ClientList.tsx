import { Avatar, Col, Divider, List, message } from "antd";
import React from "react";

const DISPLAY_SIZES = {
  xs: { span: 24, offset: 0 },
  sm: { span: 16, offset: 4 },
  md: { span: 16, offset: 4 },
  lg: { span: 16, offset: 4 },
  xl: { span: 16, offset: 4 },
};

const data = [
  {
    FName: "Chanaka",
    LName: "Prasanna",
    serviceName: "online coaching",
  },
  {
    FName: "Anuradha",
    LName: "Dharmasiri",
    serviceName: "personal training",
  },
  {
    FName: "Chandira",
    LName: "Weerawardhana",
    serviceName: "online coaching",
  },
  {
    FName: "danushi",
    LName: "Jay",
    serviceName: "personal training",
  },
];

const ClientList = () => {
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60px",
          color: "black",
          backgroundColor: "rgba(0,255,0,0.25)",
          minWidth: "200px",
        }}
      ></div>
      <Col {...DISPLAY_SIZES}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                style={{ display: "flex", alignItems: "center" }}
                avatar={<Avatar src={img1} />}
                title={
                  <p
                    className="clientName"
                    style={{ color: "#1890ff" }}
                    onClick={() => message.success("Hi")}
                  >
                    {item.FName} {item.LName}
                  </p>
                }
                description={`${item.FName} has sent request for ${item.serviceName}`}
              />
            </List.Item>
          )}
        />
      </Col>
    </>
  );
};

export default ClientList;
