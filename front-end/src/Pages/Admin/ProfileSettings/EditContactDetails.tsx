import { Button, Form, Input} from 'antd';
import React from 'react';
import { Card, Space} from 'antd';
import { message } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../Hooks/useAuthContext';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const EditContactDetails: React.FC = () => {
  
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
      content: 'Successfully Update Contact Details',
      
    });
  };

  const [moNumber, setMoNumber] = useState<string>("");


  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`http://localhost:3000/api/admin/${userId}`, {})
        .then(function (response) {
          setMoNumber(response.data.moNumber);
        })
        .catch(function (error) {
          message.error(error);
        })
        .finally(function () {});
    }
  },);

  const handleSubmit = (e:any) => {
    e.preventDefault();

    axios.post("/api/adminContact", {
      moNumber
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
      <Form.Item name="moNumber" label="Mobile Number" rules={[{ required: true , message: 'Please enter your Mobile Number!' }]}>
        <Input  onChange={(e) => { setMoNumber(e.target.value)}}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
      <>
      {contextHolder}
      <Space direction='horizontal'>
        <Button type="primary" htmlType="submit" onSubmit={(handleSubmit)} onClick={(success)} style={{font:'black'}}>
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
export default EditContactDetails;