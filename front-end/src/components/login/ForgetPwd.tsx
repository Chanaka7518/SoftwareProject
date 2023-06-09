import React, { useState, useRef } from "react";
import { Input, Modal, Form, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";

// for reset pwd
import { ToastContainer, toast } from "react-toastify";

const ForgetPwd: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const navigateTo = useNavigate();
  const [form] = Form.useForm();

  const handleOk = (event: any) => {
    // form.submit();
    event.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:5001/api/sendPwdResetLink", {
        email: email,
      })
      .then((response) => {
        if (response.data.message === "Email was  sent successfully") {
          message.success(response.data.message);
          setIsLoading(false);
          setOpen(!open);
          navigateTo("/success");
        } else {
          message.error(response.data.message);
          setIsLoading(false);
          navigateTo("/login");
        }
      })
      .catch(function (error) {
        message.error(error);
        setIsLoading(false);
      });
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
        </Form>
      </Modal>
    </>
  );
};

export default ForgetPwd;
