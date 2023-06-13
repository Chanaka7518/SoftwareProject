import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Descriptions } from 'antd';
import { Link } from "react-router-dom";
import { useAuthContext } from '../../../Hooks/useAuthContext';
import { message } from 'antd';

const PersonalDetails: React.FC = () => {
  const { userData } = useAuthContext();
  let userId = userData?._id;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>(""); 
  const [email, setEmail] = useState<string>(""); 

    // Effect to fetch the user information from the backend
    useEffect(() => {
      axios.get(`http://localhost:5001/api/users/admin/${userId}`,{}).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      })
      .catch(function (error) {
        message.error(error);
      })
      .finally(function () {});
    }
 );
  
  return(
  <div style={{ lineHeight: 1.5  }}>
    <Link to="/editAdminProfile" style={{position:'absolute', right:20, color:'black'}}>
      <u>
        <b>
        Edit Personal Details
        </b>
      </u>
    </Link>
    <br></br>  
    <Descriptions layout="horizontal" > 
    <Descriptions.Item label="First Name">{userData.firstName} </Descriptions.Item> 
    </Descriptions>
    <Descriptions>
    <Descriptions.Item label="Last Name"> {userData.lastName} </Descriptions.Item>
    </Descriptions>
    <Descriptions>
    <Descriptions.Item label="Email"> {userData.email} </Descriptions.Item>
  </Descriptions>
  </div>
)};

export default PersonalDetails;