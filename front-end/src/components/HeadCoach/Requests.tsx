import React from "react";
import { Avatar, List, message } from "antd";
import "../../Pages/Styles_Pages.css";

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

const Requests = () => {
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
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
  );
};

export default Requests;
