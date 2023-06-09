import { Col, Row } from "antd";
import "./footer.css";
import { AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai";
import { RiFacebookFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <Row>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              width: "200px",
              height: "15px",
              color: "white",
              paddingLeft: "5px",
            }}
          >
            ALPHA LEE FITNESS
          </p>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <p
            style={{
              color: "white",
            }}
          >
            &copy; Alpha Lee PVT LTD
          </p>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "center" }}>
          <div className="socialContainer">
            {" "}
            <div className="social">
              {" "}
              <AiOutlineYoutube className="socialIcon" />
            </div>
            <div className="social">
              <RiFacebookFill className="socialIcon" />
            </div>
            <div className="social">
              {" "}
              <AiOutlineInstagram className="socialIcon" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
