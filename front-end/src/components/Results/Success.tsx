import React from "react";
import { Button, Col, Result } from "antd";
import { useNavigate } from "react-router";

const DISPLAY_SIZES_COL = {
  xs: { span: 24, offset: 0 },
  sm: { span: 12, offset: 0 },
  md: { span: 15, offset: 0 },
  lg: { span: 15, offset: 0 },
  xl: { span: 15, offset: 0 },
};

const Success: React.FC = () => {
  const navigateTo = useNavigate();
  const openGmail = () => {
    window.open("https://mail.google.com/", "_blank");
  };

  return (
    <Result
      status="success"
      title="Password reset link has successfully sent to your email"
      subTitle="Please check your mail box"
      extra={[
        <Button type="primary" key="console" onClick={openGmail}>
          Open Email
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            navigateTo("/");
          }}
        >
          Back to Home
        </Button>,
      ]}
    />
  );
};

export default Success;
