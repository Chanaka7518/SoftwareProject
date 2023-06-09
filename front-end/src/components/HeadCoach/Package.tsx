import {
  Col,
  Input,
  Form,
  Button,
  DatePicker,
  Row,
  Typography,
  Space,
  Tooltip,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";
import { getUserData } from "../../fetchUserData";
import { useAuthContext } from "../../Hooks/useAuthContext";

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
  const [title, setTitle] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [minOrderNumber, setMinOrderNumber] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [To, setTo] = useState<string>("");

  const { userData } = useAuthContext();
  let userId = userData?.userId;

  const fetchData = async () => {
    let data = await getUserData(`http://localhost:5001/api/coach/${userId}`);
    if (packageName === "onlineCoaching") {
      setTitle(data.onlineCoaching.title);
      setRate(data.onlineCoaching.rate);
      setMinOrderNumber(data.onlineCoaching.minOrderNumber);
      setDiscount(data.onlineCoaching.discount);
      setFrom(data.onlineCoaching.from);
      setTo(data.onlineCoaching.to);
      return;
    } else if (packageName === "personalTraining") {
      setTitle(data.personalTraining.title);
      setRate(data.personalTraining.rate);
      setMinOrderNumber(data.personalTraining.minOrderNumber);
      setDiscount(data.personalTraining.discount);
      setFrom(data.personalTraining.from);
      setTo(data.personalTraining.to);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col {...DISPLAY_SIZES}>
          {" "}
          <Typography.Title
            level={2}
            style={{ background: "rgba(0,255,0,0.25)" }}
          >
            {packageName === "onlineCoaching"
              ? "Online Coaching"
              : "Personal Training"}
          </Typography.Title>
        </Col>
      </Row>
      <Col {...DISPLAY_SIZES}>
        <Form layout="vertical">
          <Form.Item label="Title" labelCol={{ style: { color: "blue" } }}>
            <Input style={{ color: "#1890ff" }} value={title} />
          </Form.Item>
          <Form.Item label="Rate">
            <Input style={{ color: "#1890ff" }} value={rate} />
          </Form.Item>
          <Form.Item label="Minimum Order Number">
            <Input style={{ color: "#1890ff" }} value={minOrderNumber} />
          </Form.Item>
          <Form.Item label="Discount">
            <Input style={{ color: "#1890ff" }} value={discount} />
          </Form.Item>

          <Form.Item
            label={
              <span>
                From{" "}
                <Tooltip title="Add starting date">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            }
          >
            <Space
              direction="horizontal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ color: "#1890ff" }}>{from}</span>
              <DatePicker
                placeholder="Update date"
                style={{ width: "100%", color: "#1890ff" }}
                format="YYYY/MM/DD"
                onChange={(date, dateString) => {
                  console.log(dateString);
                }}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label={
              <span>
                To{" "}
                <Tooltip title="Add ending date">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              </span>
            }
          >
            <Space
              direction="horizontal"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span style={{ color: "#1890ff" }}>{To}</span>
              <DatePicker
                placeholder="Update date"
                style={{ width: "100%", color: "#1890ff" }}
                format="YYYY/MM/DD"
                onChange={(date, dateString) => {
                  console.log(dateString);
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Description">
            <TextArea placeholder="Add a description" />
          </Form.Item>
          <Form.Item style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => {
                setSelectedMenu("dashbord");
              }}
              block
            >
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              danger={true}
              onClick={() => {
                setSelectedMenu("dashbord");
              }}
              block
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default Package;
