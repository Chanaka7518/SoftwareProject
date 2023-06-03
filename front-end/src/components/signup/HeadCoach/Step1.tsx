import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Space, Select, Col, Row } from "antd";
import "./Style.css";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import Step2 from "./Step2";

const Display = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 12, offset: 0 },
  xl: { span: 12, offset: 0 },
};
interface Props {
  handleNext1: () => void;
  handleCancel1: (values: any) => void;
  onFinish: (values: any) => void;
  visible1: boolean;
}
const Step1: React.FC<Props> = ({
  handleCancel1,
  handleNext1,
  visible1,
  onFinish,
}) => {
  const handleFinish = (values: any) => {
    handleNext1();
    onFinish(ArrayPopUp1);
  };
  const handleSubmit = () => {
    form.submit();
  };
  //---------------------------------------------------
  const [form] = Form.useForm();
  const userRef = useRef<HTMLInputElement>();

  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [nicNo, setNicNo] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const ArrayPopUp1 = useRef<string[]>([]);
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    ArrayPopUp1.current[0] = fName;
  }, [fName]);

  useEffect(() => {
    ArrayPopUp1.current[1] = lName;
  }, [lName]);

  useEffect(() => {
    ArrayPopUp1.current[2] = pwd;
  }, [pwd]);

  useEffect(() => {
    ArrayPopUp1.current[3] = nicNo;
  }, [nicNo]);

  useEffect(() => {
    ArrayPopUp1.current[4] = address;
  }, [address]);

  useEffect(() => {
    ArrayPopUp1.current[5] = gender;
  }, [gender]);

  return (
    <div className="card">
      <h2 className="signup-title">SIGN UP</h2>
      {visible1 && (
        <Form
          className="form"
          form={form}
          name="welcome"
          layout="vertical"
          onFinish={handleFinish}
        >
          <Row gutter={2}>
            <Col {...Display}>
              <Form.Item
                label="First Name"
                name="First_Name"
                hasFeedback
                rules={[
                  {
                    // required: true,
                    message: "Please input your first name ",
                  },

                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "First Name can only contain letters",
                  },
                  {
                    min: 4,
                    message: "First Name must have at least 4 characters",
                  },
                ]}
              >
                <Input
                  style={{ borderRadius: "0px" }}
                  ref={userRef as any}
                  value={fName}
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col {...Display}>
              <Form.Item
                label="Last Name"
                name="Last_Name"
                hasFeedback
                rules={[
                  {
                    // required: true,
                    message: "Please input your last name!",
                  },

                  {
                    pattern: /^[a-zA-Z]+$/,
                    message: "First Name can only contain letters",
                  },
                  {
                    min: 4,
                    message: "First Name must have at least 4 characters",
                  },
                ]}
              >
                <Input
                  style={{ borderRadius: "0px" }}
                  value={lName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={2}>
            <Col {...Display}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("You must have a password");
                      }

                      return Promise.resolve();
                    },
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                    message:
                      "Password must contain at least one letter, one number, and one special character",
                  },
                  {
                    min: 8,
                    message: "Password must have at least 8 characters",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  style={{ borderRadius: "0px" }}
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
              </Form.Item>
            </Col>
            <Col {...Display}>
              <Form.Item
                label="Confirm Password"
                name="ConfirmP_assword"
                hasFeedback
                rules={[
                  {
                    // required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password style={{ borderRadius: "0px" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="Address"
                rules={[{ required: false, message: "Please input address" }]}
              >
                <TextArea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  maxLength={100}
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={2}>
            <Col {...Display}>
              <Form.Item
                label="Nic No"
                name="nicNo"
                hasFeedback
                rules={[
                  {
                    // required: true,
                    message: "Please input your NIC!",
                  },

                  {
                    pattern: /^\d{9}[Vv]$|^\d{12}$/,
                    message:
                      "NIC must start with 9 digits and end with a capital or lowercase V, or have 12 digits with no letters",
                  },
                ]}
              >
                <Input
                  style={{ borderRadius: "0px" }}
                  onChange={(e) => setNicNo(e.target.value)}
                  value={nicNo}
                />
              </Form.Item>
            </Col>
            <Col {...Display}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    // required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select
                  placeholder="select your gender"
                  value={gender}
                  onChange={(gender) => setGender(gender)}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div
              className="btn-container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <button className="back" disabled>
                Back
              </button>
              <button className="next" onClick={handleSubmit}>
                Next
              </button>
            </div>
          </Form.Item>
          <Form.Item>
            <button type="submit" className="cancell" onClick={handleCancel1}>
              Cancell
            </button>
          </Form.Item>
        </Form>
      )}{" "}
    </div>
  );
};

export default Step1;
