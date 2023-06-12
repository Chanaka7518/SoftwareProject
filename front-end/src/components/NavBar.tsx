import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";
import { Popover, Space } from "antd";
import "./NavBar.css";
import Unauthorized from "./Errors/403";
const img1: string = new URL(`../Assets/profile.png`, import.meta.url).href;

const NavBar = () => {
  const { logout } = useLogout();
  const { userData } = useAuthContext();
  const userRole = userData?.role;

  const handleClick = () => {
    logout();
  };
  const [pop, setPop] = useState<boolean>(false);
  const handlePopOver = () => {
    setPop(!pop);
  };
  let navigateToLogin = useNavigate();

  const openLoginModal = () => {
    navigateToLogin("/login");
  };
  const openSignUpModal = () => {
    navigateToLogin("/signup");
  };

  return (
    <header>
      <div className="nav-container">
        <div className="alpha-lee">
          <Link to="/">
            <h1 className="test">Alpha Lee</h1>
          </Link>
        </div>
        <nav>
          <div className="pages-nav">
            <Link to="/">Home</Link>
            <Link to="#aboutus">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/coaching">Contact Us</Link>
          </div>
          {!userData && (
            <div className="buttonContainers">
              {" "}
              <Link
                to="/login"
                onClick={openLoginModal}
                className="open-buttons"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="open-buttons"
                onClick={openSignUpModal}
              >
                Sign Up
              </Link>
            </div>
          )}
          {userData && (
            <div
              style={{
                display: " flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Popover
                content={
                  <Space direction="vertical">
                    {/* For coaches */}
                    {userRole === "Coach" && (
                      <Link to="/headcoachProfile">Profile</Link>
                    )}
                    {userRole === "Coach" &&
                      userData.isAcceptedSeller &&
                      userData.isAppliedAsSeller && (
                        <Link to="/dashboard">Dashbord</Link>
                      )}
                    {userRole === "Coach" &&
                      !userData.isAcceptedSeller &&
                      userData.isAppliedAsSeller && (
                        <Link to="/dashboard">Dashbord</Link>
                      )}
                    {userRole === "Coach" &&
                      !userData.isAcceptedSeller &&
                      !userData.isAppliedAsSeller && (
                        <Link to="/sellerapplication">seller application</Link>
                      )}

                    {/* For Admin */}

                    {userRole === "Admin" && <Unauthorized />}

                    {/* For Clients */}
                    {userRole === "Client" && (
                      <Link to="/clientProfile">Profile</Link>
                    )}

                    {userRole === "Client" && (
                      <Link to="/dashboard">Dashboard</Link>
                    )}

                    <a onClick={handleClick} style={{ color: "red" }}>
                      Log out
                    </a>
                    {/* <a style={{ color: "red" }} onClick={handlePopOver}>
                      Close
                    </a> */}
                  </Space>
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
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
