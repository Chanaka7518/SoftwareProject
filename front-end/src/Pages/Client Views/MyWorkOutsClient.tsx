import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Space } from 'antd';
import "./style.css";
import { useAuthContext } from '../../Hooks/useAuthContext';
const OCPhoto: string = new URL(`./w.png`, import.meta.url).href;



const MyWorkOutsClient: React.FC = () => {
  const { userData } = useAuthContext();
  const userId= userData?._id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/orders/${userId}`);
       
       
       console.log(response.data); setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();



  }, []);

  

  return (
    <Space style={{ width: "100%" }}>
      <Col xs={{ span: 24, offset: 0 }}>
        <h1>My Workouts</h1>
        <Row>
          <Col xs={{ span: 22, offset: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <img src={OCPhoto} style={{ width: "110%", height: "auto" }} />
            </div>
          </Col>
        </Row>

        <div className="packageards">
          <div><h2>In Progress Workouts</h2></div>
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <Row gutter={16}>
                {orders.map((order: any) => (
                  <Col span={6} key={order._id}>
                    
                      <Card title={order.title} bordered={true}>
                        Coach {order.sellerId}
                      </Card>
                    
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>

        <div className="packageards">
          <div><h2>Completed Workouts</h2></div>
          <Row>
            <Col xs={{ span: 22, offset: 1 }}>
              <Row gutter={16}>
                {/* Render completed workouts */}
              </Row>
            </Col>
          </Row>
        </div>
      </Col>
    </Space>
  );
}

export default MyWorkOutsClient;
