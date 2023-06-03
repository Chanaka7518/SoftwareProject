import { Avatar, List, message } from "antd";
import React from "react";

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

const Completed = () => {
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
                onClick={() => message.success("Hi Chanaka")}
              >
                {item.FName} {item.LName}
              </p>
            }
            description={`${item.FName} has completed this plan on 30/02/2023`}
          />
        </List.Item>
      )}
    />
  );
};

export default Completed;
