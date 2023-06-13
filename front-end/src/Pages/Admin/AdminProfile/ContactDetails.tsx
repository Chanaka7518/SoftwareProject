import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';
import { Link } from "react-router-dom";
import { useAuthContext } from '../../../Hooks/useAuthContext';
import { message } from 'antd';

const ContactDetails: React.FC = () => {
  const { userData } = useAuthContext();
  let userId = userData?._id;

  const [moNumber, setMoNumber] = useState<string>("");
  const [email, setEmail] = useState<string>(""); 

    // Effect to fetch the user information from the backend
    useEffect(() => {
      if (userData?.userId) {
      axios.get(`hhttp://localhost:5001/api/users/admin/${userId}`,{}).then((response) => {
      setMoNumber(response.data.moNumber);
        setEmail(response.data.email);
        
      })
      .catch(function (error) {
        message.error(error);
      })
      .finally(function () {});
    
  }});
  
  return(
  <div style={{ lineHeight: 1.5  }}>
    <Link to="/editAdminProfile" style={{position:'absolute', right:20, color:'black'}}>
      <u>
        <b>
        Edit Contact Details
        </b>
      </u>
    </Link>
    <br></br>  
    <Descriptions layout="horizontal" > 
    <Descriptions.Item label="Mobile Number">{userData.moNumber} </Descriptions.Item> 
    </Descriptions>
    <Descriptions>
    <Descriptions.Item label="Email Address"> {userData.email} </Descriptions.Item>
  </Descriptions>
  </div>
)};

export default ContactDetails;