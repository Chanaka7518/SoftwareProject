import React from "react";
import { Form, Input, Button } from "antd";
import "./Style.css"; // Import your custom styles

const Form1 = () => {
  return (
    <div className="form-container">
      <Form className="custom-form">
        <Form.Item label="Username">
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form1;
