import React, { useEffect, useState } from "react";
import "./SellerApplication.css";
import { Form, Input, Select, message } from "antd";
import { Option } from "antd/es/mentions";
import newRequest from "../../../Utils/newRequest";
import { useAuthContext } from "../../../Hooks/useAuthContext";
import TextArea from "antd/es/input/TextArea";
import { useLogout } from "../../../Hooks/useLogout";
import { useNavigate } from "react-router";
import { MinusCircleOutlined } from "@ant-design/icons";

const SellerApplication: React.FC = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [moNumber, setMoNumber] = useState<string>("");
  const [whatsApp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { userData } = useAuthContext();

  const userId = userData?._id;
  //from form
  const [age, setAge] = useState<number>();
  const [nic, setNic] = useState<number>();
  const [address, setAddress] = useState<string>("");
  const [web, setWeb] = useState<string>("");
  const [fb, setFb] = useState<string>("");
  const [insta, setInsta] = useState<string>("");
  const [tikTok, setTiktok] = useState<string>("");
  const [des, setDes] = useState<string>("");
  // const [qualifications, setQualifications] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<string[]>([]);

  //achievements
  const handleAddAchievements = () => {
    setAchievements([...achievements, ""]);
  };
  const handleAchievementsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = event.target.value;
    setAchievements(updatedAchievements);
    console.log(achievements);
  };
  const handleRemoveAchievements = (indexToRemove: number) => {
    const updatedQualifications = achievements.filter(
      (achievment, index) => index !== indexToRemove
    );
    setAchievements(updatedQualifications);
  };

  //experiences
  const handleAddExperiences = () => {
    setExperiences([...experiences, ""]);
  };
  const handleExperiencesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = event.target.value;
    setExperiences(updatedExperiences);
    console.log(experiences);
  };
  const handleRemoveExperiences = (indexToRemove: number) => {
    const updatedExperiences = experiences.filter(
      (experience, index) => index !== indexToRemove
    );
    setExperiences(updatedExperiences);
  };

  // fetch existing user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/users/coach/${userData._id}`);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setGender(res.data.gender);
        setMoNumber(res.data.moNumber);
        setWhatsapp(res.data.whatsApp);
        setEmail(res.data.email);
        console.log(email, firstName, lastName, gender, moNumber, whatsApp);
      } catch (err: any) {
        message.error(err.message);
      }
    };

    fetchData();
  }, []);

  const onfinish = async () => {
    try {
      const res = await newRequest.post(`/users/coach/application/${userId}`, {
        address: address,
        nicNo: nic,
        webSite: web,
        athleticArchievements: achievements,
        experiences: experiences,
        facebook: fb,
        tiktok: tikTok,
        instagram: insta,
        email: email,
      });

      message.success(res.data);
      if (res.data === "Your application has sent for the review") {
        logout();
        navigate("/login");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };
  return (
    <div className="seller_application_container">
      <div>
        <h1 className="seller-form-title">Seller Application</h1>
        <Form className="seller-form" layout="vertical" onFinish={onfinish}>
          {/* Input fields */}
          <Form.Item
            label="First Name:"
            hasFeedback
            name="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name ",
              },

              {
                pattern: /^[a-zA-Z]+$/,
                message: "First Name can only contain letters",
              },
              {
                min: 4,
                message: "First Name must have at least 4 characters",
              },
            ]}
          >
            <Input
              value={firstName}
              className="seller-inputs"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="Last Name"
            label="Last Name:"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },

              {
                pattern: /^[a-zA-Z]+$/,
                message: "First Name can only contain letters",
              },
              {
                min: 4,
                message: "First Name must have at least 4 characters",
              },
            ]}
          >
            <Input
              className="seller-inputs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Age:"
            name="Age"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },

              {
                pattern: /^(1[89]|[2-5]\d|6[0-5])$/,
                message: "Seller's age must be between 18 and 65",
              },
            ]}
          >
            <Input
              value={age}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAge(Number(e.target.value))
              }
              className="seller-inputs"
            />
          </Form.Item>
          <Form.Item required hasFeedback name="Gender" label="Gender">
            <Select
              className="seller-inputs"
              placeholder="select your gender"
              value={gender}
              onChange={(gender) => setGender(gender)}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Nic Number:"
            name="Nic Number"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your NIC!",
              },

              {
                pattern: /^\d{9}[Vv]$|^\d{12}$/,
                message:
                  "NIC must start with 9 digits and end with a capital or lowercase V, or have 12 digits with no letters",
              },
            ]}
          >
            <Input
              className="seller-inputs"
              value={nic}
              onChange={(e) => setNic(Number(e.target.value))}
            />
          </Form.Item>
          <Form.Item
            label="Address:"
            name="Address"
            rules={[{ required: false, message: "Please input address" }]}
          >
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </Form.Item>

          <Form.Item
            label="Mobile Number:"
            name=" Mobile Number"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your mobile number",
              },
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }

                  return Promise.resolve();
                },
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number should start with 0 and have 10 digits",
              },
            ]}
          >
            <Input
              className="seller-inputs"
              value={moNumber}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="WhatssApp Number:"
            name="WhatsApp"
            hasFeedback
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  return Promise.resolve();
                },
              },
              {
                pattern: /^0\d{9}$/,
                message: "Phone number should start with 0 and have 10 digits",
              },
            ]}
          >
            <Input
              className="seller-inputs"
              value={whatsApp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email: "
            name="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid Email!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              className="seller-inputs"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Item>


          <Form.Item label="Athletic achievments:" name="Athletic achievments">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {achievements.map((achievment, index) => (
                <div>
                  <Input
                    placeholder="Enter a Achievements"
                    className="seller-inputs"
                    style={{ width: "60%", marginBottom: "10px" }}
                    value={achievment}
                    onChange={(event) => handleAchievementsChange(event, index)}
                    key={index}
                  />
                  <MinusCircleOutlined
                    type="button"
                    onClick={() => handleRemoveAchievements(index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      // marginLeft: "5px",
                      borderRadius: "50%",
                      color: "red",
                    }}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddAchievements}>
                Add New
              </button>
            </div>
          </Form.Item>
          <Form.Item label="Work Experience:" name="Work experience">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experiences.map((experience, index) => (
                <div>
                  <Input
                    placeholder="Enter a experience"
                    className="seller-inputs"
                    style={{ width: "60%", marginBottom: "10px" }}
                    value={experience}
                    onChange={(event) => handleExperiencesChange(event, index)}
                    key={index}
                  />
                  <MinusCircleOutlined
                    type="button"
                    onClick={() => handleRemoveExperiences(index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      // marginLeft: "5px",
                      borderRadius: "50%",
                      color: "red",
                    }}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddExperiences}>
                Add New
              </button>
            </div>
          </Form.Item>
          <Form.Item label=" Website:" name="Website">
            <Input
              className="seller-inputs"
              onChange={(e) => setWeb(e.target.value)}
              value={web}
            />
          </Form.Item>
          <Form.Item label="Facebook:" name="Facebook">
            <Input
              className="seller-inputs"
              onChange={(e) => setFb(e.target.value)}
              value={fb}
            />
          </Form.Item>
          <Form.Item label="Instagram:" name="Instagram">
            <Input
              className="seller-inputs"
              onChange={(e) => setInsta(e.target.value)}
              value={insta}
            />
          </Form.Item>
          <Form.Item label="TikTok:" name="TikTok">
            <Input
              className="seller-inputs"
              onChange={(e) => setTiktok(e.target.value)}
              value={tikTok}
            />
          </Form.Item>
          <Form.Item label="Short Description:" name="Description">
            <TextArea
              rows={6}
              className="seller-inputs"
              onChange={(e) => setDes(e.target.value)}
              value={des}
            />
          </Form.Item>

          {/* More input fields... */}
          <Form.Item>
            <button type="submit" className="seller-form-submit">
              Submit
            </button>
            <button
              className="seller-form-cancell"
              onClick={() => navigate("/")}
            >
              Cancell
            </button>
          </Form.Item>
          {/* Submit button */}
        </Form>
      </div>
    </div>
  );
};

export default SellerApplication;
