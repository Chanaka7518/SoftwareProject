import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import Card from "antd/es/card/Card";
import { Button, Form, Input, message, Space } from "antd";
import { Link } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const ChangePassword: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { userData } = useAuthContext();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/adminPassword`, {
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        // The request was successful
      } else {
        // The request failed
      }
    } catch (error) {
      // Handle the error
    }
    
  };


  return (
    <div>
  <Card style={{marginLeft:10, marginRight:10}} type='inner'>
  <Link to="/alf-admin" style={{position:'absolute', right:20, color:'black'}}>
      <u>
        <b>
        Back
        </b>
      </u>
    </Link>
    <br></br>  
            <Form 
      {...layout}
      style={{ maxWidth: 600 }}
      >
      <Form.Item name="oldPasssword" label="Old Password" rules={[{ required: true , message: 'Please enter your Old Password!' }]}>
        <Input.Password
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}/>
      </Form.Item>
      <Form.Item name="newPasssword" label="New Password" rules={[{ required: true , message: 'Please enter your New Password!'}]}>
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}/>
      </Form.Item>
      <Form.Item name="confirmPasssword" label="Confirm Password" rules={[{ required: true , message: 'Please enter your New Password again!'}]}>
        <Input.Password
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
      <>
      {contextHolder}
      <Form.Item>
      <Link className="login-form-forgot" to="/forgetpwd">
                Forgot Password
              </Link>{" "}
      </Form.Item>
      
<Space direction="vertical">
        <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
        Change Password
        </Button>

        </Space>
        </>

      </Form.Item>
    </Form>
            </Card>
            </div>
  )};
export default ChangePassword;
