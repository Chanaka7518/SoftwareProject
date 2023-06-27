import React from 'react';
import { Form, Modal } from 'antd';

interface WorkoutModalProps {
  order: any;
}

const WorkoutModal: React.FC<WorkoutModalProps> = ({ order }) => {
  return (
    <>
      
      <Modal
        visible={true} // Always visible in this example
        onCancel={() => console.log('Modal closed')}
        footer={null}
        
      >
        <div className="buy-service-page">
          <div className="buying-details">
          <h1>Workout Details</h1>
            <Form.Item style={{ fontWeight: "bold" }} >
              <span style={{ color: "gray", fontSize: "25px" }}>
                Coach ID - {order.sellerId}
              </span>
            </Form.Item>
            <Form.Item style={{ fontWeight: "bold" }} >
              <span style={{ color: "gray", fontSize: "25px" }}>
                Order Title - {order.title}
              </span>
            </Form.Item>
            <Form.Item style={{ fontWeight: "bold" }} >
              <span style={{ color: "gray", fontSize: "25px" }}>
                Order Price - {order.Price}
              </span>
            </Form.Item>
            <Form.Item className="buy-btn-container">
              <button className="pay-now-btn pay">View Workout</button>
              <button className="pay-now-btn cancell">Cancel</button>
            </Form.Item>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default WorkoutModal;
