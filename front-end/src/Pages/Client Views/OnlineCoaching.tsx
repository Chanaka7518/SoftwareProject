import React from 'react';
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';
import { Avatar,Card,Row,Col } from 'antd';

import "./style.css";

const { Meta } = Card;
interface Props {
  setSelectedMenu: (value: string) => void;
}

const OnlineCoaching: React.FC<Props> = ({ setSelectedMenu }) => {
 
  return (
    <div>
      <h1>Online Coaching</h1>
       <Row>
       <Col xs={{ span:10, offset: 8}} >
       <img src="https://thumbs.dreamstime.com/z/fitness-girl-her-online-session-personal-trainer-doing-abs-exercises-home-fit-183408454.jpg" alt="My Image"  style={{ width: '600px', height: 'auto' }}/>

         </Col>
        </Row>
        <div>
        <Row>
       <Col xs={{ span:14, offset: 5}} >  
       <div className="perDes">Online coaching in a gym typically involves a remote personal training program delivered through a digital platform. This can include personalized workout plans, virtual coaching and feedback on exercise technique, nutrition advice, and progress tracking. It allows clients to access fitness coaching from anywhere, often at a more affordable cost compared to in-person coaching.</div></Col>
        </Row>
        <h1>Let's Create a workout Plan</h1>
        <div className="workout-plan-container">
      
      <h2 className='Instructions'>Instructions</h2>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <h3 style={{ marginBottom: '5px' }}>Instruction  1:</h3>
          <p></p>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <h3 style={{ marginBottom: '5px' }}>Instruction  2:</h3>
          <p></p>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <h3 style={{ marginBottom: '5px' }}>Instruction  3:</h3>
          <p></p>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <h3 style={{ marginBottom: '5px' }}>Instruction  4:</h3>
          <p></p>
        </li>
      </ul>
    </div>
{/* <div>
  <h3></h3>
  <ul>
    <li>Instruction 1</li>
    <li>Instruction 2</li>
    <li>Instruction 3</li>
  </ul>
</div> */}



<button className='buttonLetsGetStart'    onClick={() => {
      setSelectedMenu("CoachListClient");
    }}>Let's Get Started!!!</button>
        
        

        </div>
             
       
    </div>
  )
}

export default OnlineCoaching