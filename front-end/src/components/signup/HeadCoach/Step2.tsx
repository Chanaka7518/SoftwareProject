import { Form, Input } from "antd";
import React from "react";

interface Props {
  email: string;
  setEmail: (value: string) => void;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  mobileNumberW: string;
  setMobileNumberW: (value: string) => void;
}
const Step2: React.FC<Props> = ({
  email,
  mobileNumber,
  mobileNumberW,
  setEmail,
  setMobileNumber,
  setMobileNumberW,
}) => {
  return (
    <div>
      <h2>Step 2: Contact Information</h2>

      <div className="custom-input" style={{ width: "100%" }}>
        <Form.Item
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
              message: "Phone number should start with 0 and have 10 digits",
            },
          ]}
        >
          <Input
            className="square-input"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => {
              setMobileNumber(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="WhatsApp"
          hasFeedback
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
            },
            {
              pattern: /^0\d{9}$/,
              message: "Phone number should start with 0 and have 10 digits",
            },
          ]}
        >
          <Input
            className="square-input"
            value={mobileNumberW}
            placeholder="WhatsApp Number"
            onChange={(e) => {
              setMobileNumberW(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
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
          <Input
            className="square-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default Step2;
