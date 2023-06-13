import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input} from 'antd';
import { Card, Space} from 'antd';
import { message } from 'antd';
import { useAuthContext } from '../../../Hooks/useAuthContext';
import { Link } from 'react-router-dom';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditPersonalDetails: React.FC = () => {
  
  const [form] = Form.useForm();
  
  const { userData } = useAuthContext();
  let userId = userData?.userId;

  const [messageApi, contextHolder] = message.useMessage();

  const onCancel = () => {
    form.resetFields();
  };
  
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully Update Personal Details',
      
    });
  };

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");


  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:5001/api/admin/${userId}`, {})
        .then(function (response) {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
        })
        .catch(function (error) {
          message.error(error);
        })
        .finally(function () {});
    }
  }, [userData]);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    axios.post("/api/adminPassword", {
      firstName,
      lastName
    });
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
      form={form}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="firstName" label="First Name" rules={[{ required: true , message: 'Please enter your First Name!' }]}>
        <Input  onChange={(e) => { setFirstName(e.target.value)}}/>
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true , message: 'Please enter your Last Name!' }]}>
        <Input  onChange={(e) => { setLastName(e.target.value)}}/> 
      </Form.Item>
      <Form.Item {...tailLayout}>
      <>
      {contextHolder}
      <Space direction='horizontal'>
        <Button type="primary" htmlType="submit" onSubmit={handleSubmit} onClick={(success)} style={{font:'black'}}>
          Save
        </Button>
        <Button htmlType="button" onClick={onCancel} >
          Cancel
        </Button>
        </Space>
        </>
      </Form.Item>
    </Form>
            </Card>
            </div>
  )};
    export default EditPersonalDetails;
