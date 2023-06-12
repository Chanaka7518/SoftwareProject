import { Button, Form, Modal, Input, message } from "antd";
import { useForm } from "rc-field-form";
import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import newRequest from "../../Utils/newRequest";

interface Props {
  openLinkGeneartor: boolean;
  setOpenLinkGeneartor: (values: boolean) => void;
}

const GenerateLink: React.FC<Props> = ({
  openLinkGeneartor,
  setOpenLinkGeneartor,
}) => {
  const [form] = Form.useForm();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOk = async (values: any) => {
    form.submit();
    setIsLoading(true);

    try {
      const res = await newRequest.post("/emails/registerCoach", {
        email: email,
      });
      if (res.data.message === "Email was  sent successfully") {
        message.success(res.data.message);
        setIsLoading(false);
        return setOpenLinkGeneartor(false);
      }
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err.response.data);
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setOpenLinkGeneartor(false);
  };
  const onFinish = (values: any) => {
    console.log(values.email);
  };

  const [validEmail, setValidEmail] = useState(false);

  const handleFieldsChange = (_: any, allFields: any) => {
    const emailField = allFields.find(
      (field: any) => field.name[0] === "email"
    );
    if (emailField && emailField.errors.length === 0) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  return (
    <div>
      <Modal
        title="Enter Your Email"
        open={openLinkGeneartor}
        footer={[
          <Button onClick={handleCancel}>Cancell</Button>,
          <Button
            onClick={handleOk}
            disabled={validEmail ? false : true}
            type="primary"
            loading={isLoading}
          >
            Send
          </Button>,
        ]}
      >
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFieldsChange={handleFieldsChange}
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
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GenerateLink;
