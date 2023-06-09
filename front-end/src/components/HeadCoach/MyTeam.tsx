import { Avatar, Col, Divider, List, Menu, message } from "antd";
import { useState } from "react";

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
    Role: "Asistant Coach",
  },
  {
    FName: "Anuradha",
    LName: "Dharmasiri",
    Role: "Asistant Coach",
  },
  {
    FName: "Chandira",
    LName: "Weerawardhana",
    Role: "Asistant Coach",
  },
  {
    FName: "danushi",
    LName: "Jay",
    Role: "Team Member",
  },
  {
    FName: "Prabath",
    LName: "Harsha",
    Role: "Team Member",
  },
  {
    FName: "Chandika",
    LName: "Rathnayaka",
    RoleRole: "Asistant Coach",
  },
  {
    FName: "Lakshan",
    LName: "Chamara",
    Role: "Team Member",
  },
  {
    FName: "Nalaka",
    LName: "Sampath",
    Role: "Team Member",
  },
];
const MyTeam = () => {
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  const [selectedMenu, setSelectedMenu] = useState<string>("Asistant Coach");
  return (
    <>
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
        defaultSelectedKeys={["Asistant Coach"]}
        onClick={({ key }) => {
          setSelectedMenu(key);
        }}
        items={[
          { label: "Aistant Coaches", key: "Asistant Coach" },
          { label: "Team Members", key: "Team Member" },
        ]}
      ></Menu>

      <Col {...DISPLAY_SIZES}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <>
              {item.Role === selectedMenu && (
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
                    description={`${item.Role}`}
                  />
                </List.Item>
              )}
            </>
          )}
        />
      </Col>
    </>
  );
};

export default MyTeam;
