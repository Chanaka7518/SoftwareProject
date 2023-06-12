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
import UnderReview from "../components/Results/UnderReview";
import MyWorkOutsClient from "./Client Views/MyWorkOutsClient";

const Dashboard = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("dashbord");
  const { logout } = useLogout();
  const { userData } = useAuthContext();
  const userRole = userData?.role;

  const routeTo = useNavigate();
  return (
    <div className="dashboards">
      <Row>
        <Col style={{ width: "90%" }}>
          <CoachHeader
            drawerVisible={drawerVisible}
            setDrawerVisible={setDrawerVisible}
          />
        </Col>
      </Row>
      <Row>
        {/* // HeadCoach menue */}
        <Col xs={0} sm={8} md={6} lg={4}>
          {/* #####################################---Desktop/Tab MENU---#################################### */}

          {/* For accepted coaches */}
          {userRole === "Coach" &&
            userData.isAcceptedSeller &&
            userData.isAppliedAsSeller && (
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

          {/* for not accepted  and applied  coaches */}
          {userRole === "Coach" &&
            !userData.isAcceptedSeller &&
            userData.isAppliedAsSeller && (
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

                  { label: "My Profile", key: "profile" },

                  { label: "Log out", key: "logout", danger: true },
                ]}
              ></Menu>
            )}
          {/* for not  applied  coaches */}
          {userRole === "Coach" && !userData.isAppliedAsSeller && (
            <Menu
              style={{
                color: "black",
              }}
              theme="light"
              mode="inline"
              defaultSelectedKeys={["profile"]}
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
            {/* ###################### for head coach ########################## */}

            {/* if not accepted seller */}

            {selectedMenu === "dashbord" &&
              userRole === "Coach" &&
              !userData.isAcceptedSeller &&
              userData.isAppliedAsSeller && <UnderReview />}

            {/*  */}
            {selectedMenu === "clients" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && <MyClients />}

            {selectedMenu === "sales" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && <Sales />}

            {selectedMenu === "dashbord" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && (
                <DashboardContent setSelectedMenu={setSelectedMenu} />
              )}

            {selectedMenu === "onlineCoaching" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && (
                <Package
                  setSelectedMenu={setSelectedMenu}
                  packageName="onlineCoaching"
                />
              )}

            {selectedMenu === "personalTraining" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && (
                <Package
                  setSelectedMenu={setSelectedMenu}
                  packageName="personalTraining"
                />
              )}

            {selectedMenu === "myteam" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && <div>Hi</div>}
            {selectedMenu === "workouts" &&
              userRole === "Coach" &&
              userData.isAcceptedSeller && <Workouts />}




            {/* for clients */}
            {/* {selectedMenu === "workouts" && userRole === "Client" && (

          
             <MyWorkOutsClient setSelectedMenu={setSelectedMenu}/>
)} */}
           
           {selectedMenu === "workouts" && userRole === "Client" && (

          
<div> <MyWorkOutsClient/></div>
)}











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

  const { userData } = useAuthContext();
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
        {/* for accepted coaches */}
        {userRole === "Coach" && userData.isAcceptedSeller && (
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
              { label: "Dashboard", key: "dashbord" },
              { label: "Messages", key: "messages" },

              { label: "My Profile", key: "profile" },

              { label: "Log out", key: "logout", danger: true },
            ]}
          ></Menu>
        )}

        {/* For not accepted coaches */}
        {userRole === "Coach" && !userData.isAcceptedSeller && (
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
              { label: "Dashboard", key: "dashbord" },
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
