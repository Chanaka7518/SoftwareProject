import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space,Row,Col } from 'antd';
import "./style.css";


const data = Array.from({ length: 23 }).map((_, i) => ({
  href: '/coachPackages',
  title: `Head Coach  ${i+1}`,
  avatar: `https://joesch.moe/api/v1/random?key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string}) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

interface Props {
  setSelectedMenu: (value: string) => void;
}

const CoachListClient: React.FC<Props> = ({ setSelectedMenu }) => {
 
  return (
    <div>
        <h1>Our Coaches</h1>
        <h2>(1) First Step- Select A Coach</h2>
        <Row>
  <Col xs={{ span: 10, offset: 7 }}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <img
        src="https://img.freepik.com/premium-photo/personal-trainer-client-looking-his-progress-gym_3179-92.jpg?w=1060"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  </Col>
</Row>


      
      
      <h2>Our coaches are pre-qualified experts in their coaching fields, with years of experience helping clients achieve their goals. They possess a wealth of knowledge, skills, and tools to provide tailored and effective coaching in various areas of life..</h2>
      <div className='SelectingCoach'>
  <h1>Select your Coach</h1>
  <Row>
    <Col xs={{ span:18, offset: 3}} >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        
        dataSource={data}
        footer={
          <footer>
            <b>© Alfa Lee Fitness. All rights reserved.</b>
          </footer>
        }
        style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            onClick={() => {
              setSelectedMenu("coachPackages");
            }}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="123" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size={80} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </Col>
  </Row>
</div>


    </div>
    
  )
}

export default CoachListClient;