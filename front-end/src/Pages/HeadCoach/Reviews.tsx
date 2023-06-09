import { Avatar, Card, Space, Divider, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useState } from "react";
import Email from "../../components/Messages/Email";
import "./Review.css";

interface User {
  rate: number;
  name: string;
  email: string;
  comment: string;
  isReplied: boolean;
}

const Reviews: React.FC = () => {
  const [emailForEmail, setEmailForEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([
    {
      rate: 4.5,
      name: "John",
      email: "john@example.com",
      comment: "Highly reccomended",
      isReplied: false,
    },
    {
      rate: 5,
      name: "Jane",
      email: "jane@example.com",
      comment: "The packages are well organized,I will buy another package",
      isReplied: false,
    },
    {
      rate: 2,
      name: "Bob",
      email: "bob@example.com",
      comment: "I am not satisfied with this coach",
      isReplied: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
    <div>
      <Card style={{ width: "100%", marginTop: "5px", background: "#e9ecef" }}>
        {users.map((user, index) => (
          <div>
            <Space direction="vertical">
              <Space>
                <Avatar src={img1} />

                <span
                  style={{ color: "red" }}
                  className="userName"
                  onClick={() => {
                    window.alert("Open user profile");
                  }}
                >
                  {user.name}
                </span>
                <span>
                  {" "}
                  <Rate allowHalf disabled defaultValue={user.rate} />(
                  {user.rate})
                </span>
              </Space>

              <div style={{ paddingLeft: "40px" }}>
                <span>{user.comment}</span>
              </div>
              <span
                className="reply"
                style={{ paddingLeft: "40px", color: "#1890ff" }}
                onClick={() => {
                  setIsOpen(!isOpen);
                  setEmailForEmail(user.email);
                }}
              >
                {user.isReplied ? "replied" : "reply"}
              </span>
            </Space>

            <Divider />
          </div>
        ))}
      </Card>

      <Email setIsOpen={setIsOpen} isOpen={isOpen} email={emailForEmail} />
    </div>
  );
};

export default Reviews;
