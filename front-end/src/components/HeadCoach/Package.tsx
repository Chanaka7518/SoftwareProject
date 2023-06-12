import { Col, Input, Form, Button, Row, Typography, message, Spin } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
import newRequest from "../../Utils/newRequest";
import "./Package.css";

const DISPLAY_SIZES = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};
interface Props {
  setSelectedMenu: (value: string) => void;
  packageName: string;
}

const Package: React.FC<Props> = ({ setSelectedMenu, packageName }) => {
  const [gigImage, setImage] = useState<string>("");
  const [Ongoing, setOngoing] = useState<string>("");
  const [overallRating, setOverallRating] = useState<string>("");
  const [reviews, setReviews] = useState<string>("");
  const [sales, setSales] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [newDes, setNewDes] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");
  let [gigId, setGigId] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  let category: string;
  const { userData } = useAuthContext();

  let userId: string;
  useEffect(() => {
    userId = userData._id;
  }, []);

  if (packageName === "onlineCoaching") {
    category = "Online Coaching";
  } else {
    category = "Personal Training";
  }
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await newRequest.get(
          `/gigs/single/coach/${userId}?category=${category}`
        );

        setImage(res.data.gigPhoto);
        setTitle(res.data.Title);
        setSales(res.data.totalSales);
        setOverallRating(res.data.starNumber);
        setReviews(res.data.totalRating);
        setOngoing(res.data.ongoingOrders);
        setDes(res.data.des);
        setGigId(res.data._id);
        setIsLoading(false);
        console.log(res.data._id);
      } catch (err: any) {
        message.error(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateDetails = async () => {
    try {
      console.log(newDes);
      setIsLoading(true);
      const res = await newRequest.post(`/gigs/single/update/${gigId}`, {
        Title: newTitle === "" ? title : newTitle,
        des: newDes === "" ? des : newDes,
      });
      setIsLoading(false);
      message.success(res.data);
      setSelectedMenu("dashbord");
    } catch (err: any) {
      message.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Spin spinning={isLoading}>
        <Row>
          <Col {...DISPLAY_SIZES}>
            {" "}
            <Typography.Title
              level={2}
              style={{
                background: "rgb(5, 218, 94)",
                color: "white",
                height: "50px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              {packageName === "onlineCoaching"
                ? "Online Coaching"
                : "Personal Training"}
            </Typography.Title>
          </Col>
        </Row>
        <Col {...DISPLAY_SIZES}>
          <Form layout="vertical">
            {gigImage !== "" && (
              <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{ width: "500px", height: "250px" }}
                  src={gigImage}
                />
              </Form.Item>
            )}

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Title :</p>
                <p style={{ color: "#8d99ae" }}> {title}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Total sales :</p>
                <p style={{ color: "#8d99ae" }}> {sales}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Category :</p>
                <p style={{ color: "#8d99ae" }}>{category}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Ongoing Orders :</p>
                <p style={{ color: "#8d99ae" }}> {Ongoing}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Reviews :</p>
                <p style={{ color: "#8d99ae" }}> {reviews}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: "5px",
                }}
              >
                <p style={{ width: "30%" }}>Overall Rating :</p>
                <p style={{ color: "#8d99ae" }}> {overallRating}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "5px",
                }}
              >
                <p>Description :</p>
                <p style={{ color: "#8d99ae", textAlign: "justify" }}> {des}</p>
              </div>
            </Form.Item>
            <Form.Item label="New Title:">
              <Input
                style={{ borderRadius: "0px" }}
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="New Description:">
              <TextArea
                rows={5}
                value={newDes}
                style={{ borderRadius: "0px" }}
                onChange={(e) => {
                  setNewDes(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "10px" }}>
              <button className="pkg-save-btn" onClick={updateDetails}>
                Save
              </button>
            </Form.Item>
            <Form.Item>
              <button
                className="pkg-back-btn"
                onClick={() => {
                  setSelectedMenu("dashbord");
                }}
              >
                Back
              </button>
            </Form.Item>
          </Form>
        </Col>
      </Spin>
    </div>
  );
};

export default Package;
