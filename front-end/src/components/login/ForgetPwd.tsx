import React, { useState, useRef } from "react";
import { Input, Modal, Form, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router";
import newRequest from "../../Utils/newRequest";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "green" }} spin />
);

const ForgetPwd: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const navigateTo = useNavigate();
  const [form] = Form.useForm();

  const handleOk = async (event: any) => {
    // form.submit();
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await newRequest.post(
        "http://localhost:5001/api/emails/pwd-reset-link",
        {
          email: email,
        }
      );
      message.success(res.data);
      setIsLoading(false);
      setOpen(!open);
      navigateTo("/success");
    } catch (err: any) {
      message.error(err.message);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = () => {};

  return (
    <>
      <Modal
        title="Enter Your Email"
        open={open}
        onOk={handleOk}
        okText="Send"
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Spin spinning={isLoading} indicator={antIcon}>
            <Form.Item
              style={{ margin: "30px 0px" }}
              name="email"
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
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Item>
          </Spin>
        </Form>
      </Modal>
    </>
  );
};

export default ForgetPwd;
