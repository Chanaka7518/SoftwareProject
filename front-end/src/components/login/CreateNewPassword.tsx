import React, { useEffect, useState } from "react";
import { Input, Modal, Form, Button, Space, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import newRequest from "../../Utils/newRequest";

const CreateNewPassword: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pwd, setPassword] = useState<string>("");

  const [form] = Form.useForm();

  const { id, token } = useParams();

  const navigateTo = useNavigate();

  const handleOk = async () => {
    form.submit();
    setIsLoading(true);

    try {
      const res = await newRequest.post(
        `/auth//password-reset/${id}/${token}`,
        {
          password: pwd,
        }
      );

      message.success(res.data);
      setIsLoading(false);
      navigateTo("/login");
    } catch (err: any) {
      message.error(err.message);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const onFinish = () => {};

  return (
    <>
      <Modal
        title="Reset Password"
        open={open}
        onOk={handleOk}
        okText="Reset"
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
            name="password"
            // label="Password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message:
                  "Password must contain at least one letter, one number, and one special character",
              },
              { min: 8, message: "Password must have at least 8 characters" },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Add new Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            // label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
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
            <Input.Password
              placeholder="Confirm new Password"
              onChange={(e) => setPassword(e.target.value)}
              value={pwd}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewPassword;
