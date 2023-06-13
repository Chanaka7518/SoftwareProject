import React, { useState } from "react";
import {
  DashboardOutlined,
  PoweroffOutlined,
  UserAddOutlined,
  MessageOutlined,
  UserOutlined,
  TransactionOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useLogout } from "../../Hooks/useLogout";
import { Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi";
import { Layout, Menu, Popover, Space } from "antd";
import Generate from "../../components/signup/Generate";
import Login from "../../components/login/Login";
import CoachList from "./CoachList";
import DisplayApplication from "../../components/Admin/DisplayApplication";
import AdminDashboard from "./AdminDashboard";
import ProfileSettings from "./AdminProfile/ProfileSettings";
const { Header, Content, Footer, Sider } = Layout;

const img1: string = new URL(`../profile.png`, import.meta.url).href;

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const { userData } = useAuthContext();
  const userRole = userData?.role;

  const { logout } = useLogout();
  const handleClick = () => {
    logout();
  };

  const [pop, setPop] = useState<boolean>(false);
  const handlePopOver = () => {
    setPop(!pop);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        // style={{ background: "blue", width: "500px" }}
        collapsible collapsed={collapsed}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent:'center'
          }}
        >
             ALPHA LEE
        </div>
        <Menu
          onClick={(e) => setSelectedMenu(e.key)}
          style={{
            background: "white",
            color: "black",
            minHeight: "90vh",
            
          }}
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
        >
          {!(userRole === "Admin") && (
            <>
              <Menu.Item>
                <Login />
              </Menu.Item>
            </>
          )}

          {userRole === "Admin" && (
            <>
              {" "}
              <Menu.Item
                style={{ fontSize: "20px" }}
                key="dashbord"
                icon={<DashboardOutlined style={{ fontSize: "20px" }} />}
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: "20px" }}
                key="coachList"
                icon={<HiOutlineUsers style={{ fontSize: "20px" }} />}
              >
                Coach List
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: "20px" }}
                key="seller applications"
                icon={<UserAddOutlined style={{ fontSize: "20px" }} />}
              >
                Applications
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: "20px" }}
                key="chat"
                icon={<MessageOutlined style={{ fontSize: "20px" }} />}
              >
                Chat
              </Menu.Item>
              <Menu.Item
                style={{ fontSize: "20px" }}
                key="profileSettings"
                icon={<UserOutlined style={{ fontSize: "20px" }} />}
              >
                Profile 
              </Menu.Item>
              <Menu.Item
                onClick={handleClick}
                key="signout"
                style={{ fontSize: "20px" }}
                danger={true}
                icon={<PoweroffOutlined style={{ fontSize: "20px" }} />}
              >
                Signout
              </Menu.Item>
            </>
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: "0 50px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div
          style={{position:'absolute', left:200, justifyContent:'left', color:'white', alignContent:'center'}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setCollapsed(!collapsed),
          })}
          </div>
          {/* <span>{userData.email}</span> */}

          {userData && (
            <div style={{ width: "60px", height: "60px", borderRadius: "50%" }}>
              <Popover
                content={
                  <div>
                   <Link to="/headcoachprofile">Profile</Link>

                    <br />
                    <a onClick={handleClick}>Log out</a>
                    <br />
                    <a style={{ color: "red" }} onClick={handlePopOver}>
                      Close
                    </a>
                  </div>
                }
                title={userData.email}
                placement="leftTop"
                trigger="hover"
                // open={pop}
                // onOpenChange={handleOpenChange}
              >
                <div
                  style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                  onClick={handlePopOver}
                >
                  <img
                    src={img1}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Popover>
            </div>
          )}
        </Header>
        <Content
          style={{
            minHeight: "80vh",
            background: "#e9ecef",
          }}
        >
          {/* {selectedMenu === "generateLink" && <Generate />} */}
          {selectedMenu === "coachList" && <CoachList />}
          {selectedMenu === "dashbord" && <AdminDashboard/>}
          {selectedMenu === "seller applications" && <DisplayApplication />}
          {selectedMenu === "profileSettings" && <ProfileSettings />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Alpha Lee ©2023 All Right Reserved
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
