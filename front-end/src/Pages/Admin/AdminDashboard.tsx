import React from 'react';
import { Card , message, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { useAuthContext } from '../../Hooks/useAuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Avatar } from 'antd';


const AdminDashboard: React.FC = () => {
  const img1: string = new URL(`../../Assets/card1.png`, import.meta.url).href;
  const img2: string = new URL(`../../Assets/card2.png`, import.meta.url).href;
  const img3: string = new URL(`../../Assets/card3.png`, import.meta.url).href;
  const img4: string = new URL(`../../Assets/card4.png`, import.meta.url).href;


    const { userData } = useAuthContext();
  let userId = userData?._id;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>(""); 

    // Effect to fetch the user information from the backend
    useEffect(() => {
      axios.get(`http://localhost:5001/api/admin/${userId}`,{}).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
      })
      .catch(function (error) {
        message.error(error);
      })
      .finally(function () {});
    
  }, [userData]);

  return(
    <div >
      
  <Card >
  <p style={{fontSize:30}}> <b> Welcome  </b> {userData.firstName}   {userData.lastName}</p>
  <Row gutter={[12,16]} >
    <Col span={12}>
    <Card
    type="inner" 
    bordered={true}
    cover={
      <img
        src={img1}
        style={{ width: 529, height: 100 }}
      />}>
        <Link to="/coachList" style={{color:'black',  display:'flex', justifyContent:'center'}}> <b>Add Coach</b> </Link>
  
  </Card>
    </Col>
    <Col span={12}>
      <Card type="inner" bordered={true}
      cover={
      <img
        src={img2}
        style={{ width: 529, height: 100 }}
      />}>
        <Link to="/displayApplication" style={{color:'black', display:'flex', justifyContent:'center', fontSize:16}}>
           <b>Application</b> 
           </Link>
      </Card>
    </Col>
  </Row>
  <br></br>
  <Row gutter={[12,16]} >
    <Col span={12}>
      <Card type="inner" bordered={true} 
      cover={
      <img
        src={img3}
        style={{ width: 529, height: 100 }}
      />} >
        <Link to="/adminProfile" style={{color:'black', display:'flex', justifyContent:'center', fontSize:16}}> 
        <b>Profile</b> 
        </Link>
      </Card>
    </Col>
    <Col span={12}>
    <Card type="inner" bordered={true} 
      cover={
        <img
          src={img4}
          
          style={{ width: 529, height: 100}}
        />}  >
        <Link to="/adminCalendar" style={{color:'black', display:'flex', justifyContent:'center', fontSize:16}}> 
        <b>Calender</b> 
        </Link>
      </Card>
    </Col>
  </Row>
  </Card>
  </div>
)};

export default AdminDashboard;
