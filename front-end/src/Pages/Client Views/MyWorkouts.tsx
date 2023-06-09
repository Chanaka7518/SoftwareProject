import React from 'react'
import {  Card,Row,Col, Space  } from 'antd';

const OCPhoto: string = new URL(`./aimBackground.png`, import.meta.url).href;
interface Props {
  setSelectedMenu: (value: string) => void;
}

const MyWorkouts: React.FC<Props> = ({ setSelectedMenu }) => {
  return (
    <Space style={{width:"100%"}}>
    
        
        <Col xs={{ span: 24, offset: 0 }}>
      <h1 className='MyWorkouts_h1'>My Workouts</h1>
      <Row>
  <Col xs={{ span: 22, offset: 1 }}>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
    <img
      src={OCPhoto}
      style={{ width: "110%", height: "auto" }}
    />
   
    </div>
  </Col>
</Row>
      
    <div className="packageards">
    <div><h2>In Progress Workouts</h2></div>
    <Row>
      <Col xs={{ span:22, offset: 1}} > 
        <Row gutter={16}>
          <Col span={6}>
          
            <Card title="Workout 1" bordered={true}  onClick={() => {
      setSelectedMenu("inprogressWorkout");
    }}>
             Coach Sanuka
            </Card>
            
          </Col>
          
        </Row>
      </Col>
    </Row>
        </div>
        
        <div className="packageards">
        <div><h2>Completed Workouts</h2></div>
    <Row>
      <Col xs={{ span:22, offset: 1}} > 
        <Row gutter={16}>
          <Col span={6}>
         
            <Card title="Workout 1" bordered={true}>
             Coach Sanuka
            </Card>
            
          </Col>
          <Col span={6}>
            <Card title="Workout  2" bordered={true}>
           Coach Ashanthi
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Workout  3" bordered={true}>
           Coach Kasun
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Workout  4" bordered={true}>
            Package 1
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
        </div>
        </Col>
        </Space>
    
       
       
)
  }
export default MyWorkouts;


