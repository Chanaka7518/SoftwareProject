import { Avatar, Col, Divider, List, Typography, message } from "antd";
import React, { useState } from "react";
import { LikeOutlined, MessageOutlined, StarFilled } from "@ant-design/icons";
import Footer from "./Footer";
import "./CommonForComponents.css";

const img1: string = new URL(`../Pages/profile.png`, import.meta.url).href;

const DISPLAY_SIZES = {
  xs: { span: 24, offset: 0 },
  sm: { span: 16, offset: 4 },
  md: { span: 16, offset: 4 },
  lg: { span: 16, offset: 4 },
  xl: { span: 16, offset: 4 },
};

const DISPLAY_SIZES_COMMENTS = {
  xs: { span: 21, offset: 1 },
  sm: { span: 6, offset: 4 },
  md: { span: 6, offset: 4 },
  lg: { span: 20, offset: 0 },
  xl: { span: 20, offset: 0 },
};

const data = [
  {
    FName: `Srah`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Sarah, a certified coach who specializes in both online coaching and personal training in a gym. With over 5 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support.",
  },
  {
    FName: `Deve`,
    avatar: img1,
    description: "Online Coaching",
    content:
      "Meet Deve, a certified coach who specializes in both online coaching and personal training in a gym. With over 3 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `John`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet John, a certified coach who specializes in both online coaching and personal training in a gym. With over 1 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `Niki`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Niki, a certified coach who specializes in both online coaching and personal training in a gym. With over 5 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support.",
  },
  {
    FName: `Dale`,
    avatar: img1,
    description: "Online Coaching",
    content:
      "Meet Dale, a certified coach who specializes in both online coaching and personal training in a gym. With over 3 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `Andrew`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Andrew, a certified coach who specializes in both online coaching and personal training in a gym. With over 1 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `Srah`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Sarah, a certified coach who specializes in both online coaching and personal training in a gym. With over 5 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support.",
  },
  {
    FName: `Deve`,
    avatar: img1,
    description: "Online Coaching",
    content:
      "Meet Deve, a certified coach who specializes in both online coaching and personal training in a gym. With over 3 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `John`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet John, a certified coach who specializes in both online coaching and personal training in a gym. With over 1 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `Niki`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Niki, a certified coach who specializes in both online coaching and personal training in a gym. With over 5 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support.",
  },
  {
    FName: `Dale`,
    avatar: img1,
    description: "Online Coaching",
    content:
      "Meet Dale, a certified coach who specializes in both online coaching and personal training in a gym. With over 3 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
  {
    FName: `Andrew`,
    avatar: img1,
    description: "Online Coaching, Personal Training",
    content:
      "Meet Andrew, a certified coach who specializes in both online coaching and personal training in a gym. With over 1 years of experience in the fitness industry, Sarah has helped countless clients achieve their health and fitness goals through customized training plans and personalized support",
  },
];

export const Coaching = () => {
  const [isVisibleComments, setIsVisibleComments] = useState<boolean>(false);
  const [commentorName, setCommentorName] = useState<string>("");
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60px",
          color: "black",
          backgroundColor: "rgba(0,255,0,0.25)",
          minWidth: "200px",
        }}
      ></div>
      <Typography.Title style={{ marginBottom: "0px" }}>
        Pick A Right Choice
      </Typography.Title>
      <Col {...DISPLAY_SIZES}>
        <div className="coachList">
          <List
            style={{ backgroundColor: "#e9ecef" }}
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={data}
            renderItem={(item) => (
              <div>
                <List.Item
                  key={item.FName}
                  actions={[
                    <div onClick={() => window.alert("hi")}>
                      <StarFilled style={{ color: "#ffb703" }} />
                      4.5 (156)
                    </div>,
                    <div>
                      <MessageOutlined
                        style={{ color: "#1890ff" }}
                        onClick={() => {
                          setIsVisibleComments(!isVisibleComments);
                          setCommentorName(item.FName);
                        }}
                      />
                      156
                    </div>,
                  ]}
                >
                  <List.Item.Meta
                    style={{ display: "flex", alignItems: "center" }}
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <p
                        className="coachName"
                        onClick={() => message.success(item.FName)}
                      >
                        {item.FName}
                      </p>
                    }
                    description={item.description}
                  />
                  <p style={{ display: "flex", textAlign: "justify" }}>
                    {item.content}
                  </p>
                </List.Item>

                {/* ***************************Put id instead of name********************************* */}
                {isVisibleComments && item.FName === commentorName && (
                  <Comments commentorName={commentorName} />
                )}
                <Divider />
              </div>
            )}
          />
        </div>
      </Col>
      <Footer />
    </>
  );
};

// for comments

interface Props {
  commentorName: string;
}
const Comments: React.FC<Props> = ({ commentorName }) => {
  const name: string = commentorName;
  return (
    <div>
      {name === commentorName && (
        <Col {...DISPLAY_SIZES_COMMENTS}>
          <div className="coachList">
            <List
              style={{ backgroundColor: "#ced4da" }}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.FName}>
                  <List.Item.Meta
                    style={{ display: "flex", alignItems: "center" }}
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <p
                        className="coachName"
                        onClick={() => message.success(item.FName)}
                      >
                        {item.FName}
                      </p>
                    }
                    description={
                      <p>
                        {" "}
                        <StarFilled style={{ color: "#ffb703" }} /> 3
                      </p>
                    }
                  />
                  <p
                    style={{
                      display: "flex",
                      textAlign: "justify",
                    }}
                  >
                    Excellent coach. I reccomond for everyone
                  </p>
                </List.Item>
              )}
            />
          </div>
        </Col>
      )}
    </div>
  );
};
