import React, { useEffect, useRef, useState } from "react";

import {
  Input,
  Col,
  Form,
  Space,
  Menu,
  message,
  Rate,
  Spin,
  Select,
} from "antd";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Reviews from "./Reviews";
import SocialAccounts from "./SocialAccounts";
import "./AntMenu.css";
import newRequest from "../../Utils/newRequest";

import "./HeadCoachProfile.css";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router";

//AVATAR

const DISPLAY_SIZES = {
  xs: { span: 22, offset: 1 },
  sm: { span: 16, offset: 4 },
  md: { span: 12, offset: 6 },
  lg: { span: 12, offset: 6 },
  xl: { span: 12, offset: 6 },
};

const HeadCoachProfile: React.FC = () => {
  const navigateTo = useNavigate();
  const img1: string = new URL(`../profile.png`, import.meta.url).href;
  const { userData } = useAuthContext();
  const [userId, setUserId] = useState<string>(userData?._id);

  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [moNumber, setMoNumber] = useState<string>("");
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [fb, setFb] = useState<string>("");
  const [insta, setInsta] = useState<string>("");
  const [tiktok, setTiktok] = useState<string>("");

  //new values
  const [newfName, setNewFName] = useState<string>("Chanaka");
  const [newlName, setNewLName] = useState<string>("");
  const [newAge, setNewAge] = useState<string>("");
  const [newMoNumber, setNewMoNumber] = useState<string>("");
  const [newWhatsAppNumber, setNewWhatsAppNumber] = useState<string>("");
  const [newGender, setNewGender] = useState<string>("");
  const [newFb, setNewFb] = useState<string>("");
  const [newInsta, setNewInsta] = useState<string>("");
  const [newTiktok, setNewTiktok] = useState<string>("");

  const [selectedMenu, setSelectedMenu] = useState<string>("user");
  const [rating, setRating] = useState<number>(4);

  const [isLoading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    setIsloading(true);
    const fetchData = async () => {
      try {
        const res = await newRequest.get(`/users/coach/${userId}`, {});
        console.log(res.data);
        setFName(res.data.firstName);
        setLName(res.data.lastName);
        setAge(res.data.age);
        setMoNumber(res.data.moNumber);
        setWhatsAppNumber(res.data.whatsApp);
        setEmail(res.data.email);
        setGender(res.data.gender);
        setFb(res.data.facebook);
        setInsta(res.data.instagram);
        setTiktok(res.data.tiktok);
        setIsloading(false);
      } catch (err: any) {
        message.error(err.message);
        setIsloading(false);
      }
    };
    fetchData();
  }, []);

  const updateDetails = async () => {
    setIsloading(true);
    try {
      const res = await newRequest.post(`/users/coach/details/${userId}`, {
        firstName: newfName === "" ? fName : newfName,
        lastName: newlName === "" ? lName : newlName,
        age: newAge === "" ? age : newAge,
        moNumber: newMoNumber === "" ? moNumber : newMoNumber,
        whatsApp: newWhatsAppNumber === "" ? whatsAppNumber : newWhatsAppNumber,
        gender: newGender === "" ? gender : newGender,
        facebook: newFb === "" ? fb : newFb,
        instagram: newInsta === "" ? insta : newInsta,
        tiktok: newTiktok === "" ? tiktok : newTiktok,
      });
      message.success(res.data);
      setIsloading(false);
    } catch (err: any) {
      message.error(err.message);
      setIsloading(false);
    }
  };

  return (
    <div>
      <Spin spinning={isLoading}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
            paddingTop: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={img1}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
              }}
            />
          </div>

          <Col
            {...DISPLAY_SIZES}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Rate allowHalf disabled defaultValue={rating} />
          </Col>
          <p style={{ display: "flex", justifyContent: "center" }}>
            Welcome {fName}
          </p>
          <div>
            <Col {...DISPLAY_SIZES}>
              <Menu
                style={{ backgroundColor: "white" }}
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["user"]}
                onClick={({ key }) => {
                  setSelectedMenu(key);
                }}
                items={[
                  {
                    label: "User Details",
                    key: "user",
                  },
                  { label: "Contact", key: "contact" },
                  { label: "Accounts", key: "socialAccounts" },
                  { label: "Reviews", key: "reviews" },
                ]}
              ></Menu>
            </Col>

            <Space direction="vertical" style={{ width: "100%" }}>
              {" "}
              <Form
                name="form_item_path"
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                {selectedMenu === "user" && (
                  <div>
                    <Col {...DISPLAY_SIZES}>
                      <Form.Item
                        label="First Name"
                        name="FirstName"
                        initialValue={fName}
                      >
                        <Input
                          style={{ borderRadius: "0px" }}
                          onChange={(e) => {
                            setNewFName(e.target.value);
                          }}
                          value={newfName}
                        />
                      </Form.Item>
                    </Col>
                    <Col {...DISPLAY_SIZES}>
                      <Form.Item
                        label="Last Name"
                        name="LastName"
                        initialValue={lName}
                      >
                        <Input
                          style={{ borderRadius: "0px" }}
                          onChange={(e) => {
                            setNewLName(e.target.value);
                          }}
                          value={newlName}
                        />
                      </Form.Item>
                    </Col>
                    <Col {...DISPLAY_SIZES}>
                      <Form.Item label="Age" initialValue={age} name="Age">
                        <Input
                          style={{ borderRadius: "0px" }}
                          value={newAge}
                          onChange={(e) => {
                            setNewAge(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col {...DISPLAY_SIZES}>
                      <Form.Item label="Gender">
                        <Select
                          placeholder="select your gender"
                          value={gender}
                          onChange={(gender) => {
                            setNewGender(gender);
                          }}
                        >
                          <Option value="male">Male</Option>
                          <Option value="female">Female</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </div>
                )}
              </Form>
              <Form
                name="form_item_path"
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelAlign="left"
              >
                {selectedMenu === "contact" && (
                  <div>
                    <Col {...DISPLAY_SIZES}>
                      <Form.Item
                        label="Mobile"
                        name="Mobile"
                        initialValue={moNumber}
                      >
                        <Input
                          style={{ borderRadius: "0px" }}
                          onChange={(e) => {
                            setNewMoNumber(e.target.value);
                          }}
                          value={newMoNumber}
                        />
                      </Form.Item>
                    </Col>
                    <Col {...DISPLAY_SIZES}>
                      <Form.Item
                        label="WhatsApp"
                        name="WhatsApp"
                        initialValue={whatsAppNumber}
                      >
                        <Input
                          style={{ borderRadius: "0px" }}
                          value={newWhatsAppNumber}
                          onChange={(e) => {
                            setNewWhatsAppNumber(e.target.value);
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col {...DISPLAY_SIZES}>
                      <Form.Item label="email">
                        <Input
                          style={{ borderRadius: "0px" }}
                          value={email}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                  </div>
                )}
              </Form>
              {/* Reviews */}
              {selectedMenu === "reviews" && (
                <Col {...DISPLAY_SIZES}>
                  {" "}
                  <Reviews coachId={userId} />
                </Col>
              )}
              {/* Social Accounts */}
              {selectedMenu === "socialAccounts" && (
                <Col {...DISPLAY_SIZES}>
                  {" "}
                  <SocialAccounts
                    fb={fb}
                    setFb={setNewFb}
                    insta={insta}
                    setInsta={setNewInsta}
                    tiktok={tiktok}
                    setTiktok={setNewTiktok}
                  />
                </Col>
              )}
              {!(selectedMenu === "reviews") && (
                <>
                  <Col {...DISPLAY_SIZES}>
                    <Form.Item>
                      <button
                        className="coach-details-update-btn"
                        onClick={updateDetails}
                      >
                        Save Changes
                      </button>
                      <button
                        className="coach-details-cancell-btn"
                        onClick={() => navigateTo("/dashboard")}
                      >
                        Cancell
                      </button>
                    </Form.Item>
                  </Col>
                </>
              )}
            </Space>
          </div>
        </Space>
      </Spin>
    </div>
  );
};

export default HeadCoachProfile;
