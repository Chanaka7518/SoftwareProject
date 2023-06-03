import React, { useEffect, useState, useRef } from "react";
import "./Style.css";

import { Col, Input, Row, Form } from "antd";

const Display = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 12, offset: 0 },
  lg: { span: 12, offset: 0 },
  xl: { span: 12, offset: 0 },
};

interface Props {
  handleNext2: () => void;
  handleprevious2: () => void;
  handleCancel2: () => void;
  visible2: boolean;
  onFinish: (values: any) => void;
}

const Step2: React.FC<Props> = ({
  handleprevious2,
  handleNext2,
  handleCancel2,
  visible2,
  onFinish,
}) => {
  const [form2] = Form.useForm();
  const ArrayPopUp2 = useRef<string[]>([]);

  const handleSubmit = () => {
    form2.submit();
  };
  const handleFinish2 = (values: any) => {
    onFinish(ArrayPopUp2);
    handleNext2();
  };

  const userRef = useRef<HTMLInputElement>();

  const [moNumber, setMoNumber] = useState<string>();
  const [moNumberW, setMoNumberW] = useState<string>("");
  const [lLine, setLline] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [web, setWeb] = useState<string>("");

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  return (
    <div className="card">
      <h2 className="signup-title">SIGN UP</h2>
      <Form
        className="form"
        form={form2}
        name="welcome"
        layout="vertical"
        onFinish={handleFinish2}
      >
        <Row gutter={2}>
          <Col {...Display}>
            <Form.Item
              label="Mobile No"
              name="Mobile_Number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your mobile number",
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }

                    return Promise.resolve();
                  },
                },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Phone number should start with 0 and have 10 digits",
                },
              ]}
            >
              <Input
                ref={userRef as any}
                value={moNumber}
                onChange={(e) => {
                  setMoNumber(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col {...Display}>
            <Form.Item
              label="WhatssApp NO"
              name="WhatsApp"
              hasFeedback
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Phone number should start with 0 and have 10 digits",
                },
              ]}
            >
              <Input
                value={moNumberW}
                onChange={(e) => {
                  setMoNumberW(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col {...Display}>
            <Form.Item
              label="LandLine"
              name="Land_Line"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Phone number should start with 0 and have 10 digits",
                },
              ]}
              hasFeedback
            >
              <Input onChange={(e) => setLline(e.target.value)} value={lLine} />
            </Form.Item>
          </Col>
          <Col {...Display}>
            <Form.Item
              label="E-mail"
              name="Email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} value={email} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="Website" label="Website" hasFeedback>
              <Input onChange={(e) => setWeb(e.target.value)} value={web} />
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
            <button className="back" onClick={handleprevious2}>
              Back
            </button>
            <button className="next" onClick={handleSubmit}>
              Next
            </button>
          </div>
        </Form.Item>
        <Form.Item>
          <button type="submit" className="cancell" onClick={handleCancel2}>
            Cancell
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Step2;
