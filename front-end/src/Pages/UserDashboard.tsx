import { useState } from "react";
import { Col, Row, Menu, Drawer } from "antd";
import { useAuthContext } from "../Hooks/useAuthContext";
import { useLogout } from "../Hooks/useLogout";
import { Content, Header } from "antd/es/layout/layout";

import { useNavigate } from "react-router-dom";
import MyClients from "./HeadCoach/MyClients";

import Sales from "./HeadCoach/Sales";
import CoachHeader from "../components/HeadCoach/CoachHeader";
import DashboardContent from "./HeadCoach/DashboardContent";
import Package from "../components/HeadCoach/Package";
import Workouts from "../components/HeadCoach/Workouts";







const Dashboard = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("Workouts");
  const { logout } = useLogout();
  const { userData } = useAuthContext();
  const userRole = userData?.role;

  console.log(userRole);
  const routeTo = useNavigate();
  return (
    <div className="dashboards">
      <Row>
        {/* // HeadCoach menue */}
        <Col xs={0} sm={8} md={6} lg={4}>
          {/* #####################################---Desktop/Tab MENU---#################################### */}
          {userRole === "HeadCoach" && (
            <Menu
              style={{
                color: "black",
              }}
              theme="light"
              mode="inline"
              defaultSelectedKeys={["dashbord"]}
              onClick={({ key }) => {
                if (key === "logout") {
                  logout();
                }
                if (key === "profile") {
                  routeTo("/headcoachprofile");
                }
                setSelectedMenu(key);
              }}
              items={[
                { label: "Dashboard", key: "dashbord" },
                { label: "Messages", key: "messages" },

                { label: "My Profile", key: "profile" },

                { label: "Log out", key: "logout", danger: true },
              ]}
            ></Menu>
          )}

          {/* // Client menue */}
          {/* {userRole === "Client" && (
            <Menu
              mode="inline"
              defaultSelectedKeys={["workouts"]}
              onClick={({ key }) => {
                if (key === "logout") {
                  logout();
                }

                setSelectedMenu(key);
              }}
              items={[
                { label: "My Workouts", key: "workouts" },
                { label: "Messages", key: "messages" },
                { label: "Coaching", key: "coaching" },
                {
                  label: "Settings",
                  key: "settings",
                  children: [{ label: "Profile", key: "profile" }],
                },

                { label: "Log out", key: "logout", danger: true },
              ]}
            ></Menu>
          )} */}

          

          {userRole === "Client" && (
  <Menu
    mode="inline"
    defaultSelectedKeys={["workouts"]}
    onClick={({ key }) => {
      if (key === "logout") {
        logout();
      }

      setSelectedMenu(key);
      setDrawerVisible(false); // Add this line to close the drawer after selecting a menu item
    }}
    items={[
      { label: "My Workouts", key: "workouts" },
      { label: "Messages", key: "messages" },
      {
        label: "Coaching",
        key: "coaching",
        onClick: () => {
          setSelectedMenu("coaching");
          setDrawerVisible(false); // Add this line to close the drawer after selecting the "Coaching" menu item
        },
      },
      {
        label: "Settings",
        key: "settings",
        children: [{ label: "Profile", key: "profile" }],
      },

      { label: "Log out", key: "logout", danger: true },
    ]}
  ></Menu>
)}

        </Col>

        {/* #####################################---Mobile MENU---#################################### */}
        <Col xs={24} sm={0} md={0} lg={0}>
          <MobieMenu
            setSelectedMenu={setSelectedMenu}
            logout={logout}
            userRole={userRole}
            routeTo={routeTo}
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        </Col>
        {/* #####################################---CONTENT---#################################### */}

        <Col xs={24} sm={16} md={18} lg={20}>
          <Content
            style={{
              backgroundColor: "#e9ecef",
              width: "100%",
              padding: "10px  10px 10px 10px",
              minHeight: "100vh",
            }}
          >
            {/* for head coach */}
            {selectedMenu === "clients" && userRole === "HeadCoach" && (
              <MyClients />
            )}
            {selectedMenu === "sales" && userRole === "HeadCoach" && <Sales />}
            {selectedMenu === "dashbord" && userRole === "HeadCoach" && (
              <DashboardContent setSelectedMenu={setSelectedMenu} />
            )}
            {selectedMenu === "onlineCoaching" && userRole === "HeadCoach" && (
              <Package
                setSelectedMenu={setSelectedMenu}
                packageName="onlineCoaching"
              />
            )}
            {selectedMenu === "personalTraining" &&
              userRole === "HeadCoach" && (
                <Package
                  setSelectedMenu={setSelectedMenu}
                  packageName="personalTraining"
                />
              )}

            {selectedMenu === "myteam" && userRole === "HeadCoach" && (
              <div>Hi</div>
            )}
            {selectedMenu === "workouts" && userRole === "HeadCoach" && (
              <Workouts />
            )}

            {/* for clients */}
            
              


            {/* common */}
            {selectedMenu === "messages" && <div>Messages</div>}
          </Content>
        </Col>
      </Row>
    </div>
  );
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%--Mobile Menu Implementation--%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

interface Props {
  setSelectedMenu: (value: string) => void;
  logout: () => void;
  userRole: string;
  routeTo: (value: string) => void;
  drawerVisible: boolean;
  setDrawerVisible: (value: boolean) => void;
}

const MobieMenu: React.FC<Props> = ({
  setSelectedMenu,
  logout,
  userRole,
  routeTo,
  drawerVisible,
  setDrawerVisible,
}) => {
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <div className="dashboards">
      {/* your code for the menu and content columns here */}

      {/* Mobile menu */}
      <Drawer
        title="Menu"
        placement="left"
        open={drawerVisible}
        onClose={toggleDrawer}
      >
        {userRole === "HeadCoach" && (
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["clients"]}
            onClick={({ key }) => {
              if (key === "logout") {
                logout();
              }
              if (key === "profile") {
                routeTo("/headcoachprofile");
              }
              setSelectedMenu(key);
            }}
            items={[
              { label: "Dashboard", key: "dashboard" },
              { label: "Messages", key: "messages" },

              { label: "My Profile", key: "profile" },

              { label: "Log out", key: "logout", danger: true },
            ]}
          ></Menu>
        )}

        {/* // Client menue */}
        {userRole === "Client" && (
          <Menu
            mode="inline"
            defaultSelectedKeys={["workouts"]}
            onClick={({ key }) => {
              if (key === "logout") {
                logout();
              }

              setSelectedMenu(key);
            }}
            items={[
              { label: "My Workouts", key: "workouts" },
              { label: "Messages", key: "messages" },
              {
                label: "Settings",
                key: "settings",
                children: [{ label: "Profile", key: "profile" }],
              },

              { label: "Log out", key: "logout", danger: true },
            ]}
          ></Menu>
        )}
      </Drawer>

      {/* Button to toggle the mobile menu */}
    </div>
  );
};

export default Dashboard;
