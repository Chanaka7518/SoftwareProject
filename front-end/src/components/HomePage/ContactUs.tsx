import { Col, Form, Input, Row, Spin, message } from "antd";
import React, { useState } from "react";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import newRequest from "../../Utils/newRequest";
const { TextArea } = Input;
const ContactUs = () => {
  const [senderName, setSenderName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsApp, setWhatsApp] = useState<number>();
  const [messageDes, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitForm = async () => {
    setIsLoading(false);
    try {
      const res = await newRequest.post("/emails/send-mail-to-contact", {
        email: email,
        name: senderName,
        whatsApp: whatsApp,
        message: messageDes,
      });
      setIsLoading(false);
      message.success(res.data);
      setSenderName("");
      setEmail("");
      setWhatsApp(undefined);
      setMsg("");
    } catch (err: any) {
      message.error(err.response.data);
      setIsLoading(false);
    }
  };
  return (
    <div className="contact">
      <h2 className="aboutTitle">CONTACT US</h2>
      <div className="formAndDetails">
        <Spin spinning={isLoading}>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <div className="details">
                <h2 className="getinTouch">Get In Touch With Us</h2>
                <Row>
                  <Col span={6}>
                    <p style={{ color: "red" }}>
                      <MailOutlined />
                      {` Email:`}
                    </p>
                  </Col>
                  <Col span={18}>
                    <p>
                      {" "}
                      <a style={{}} href="mailto:info@alf.lk">
                        info@alf.lk
                      </a>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <p style={{ color: "red" }}>
                      <PhoneOutlined />
                      {` Lee:`}
                    </p>
                  </Col>
                  <Col span={18}>
                    <p>
                      <a href="tel:0766277835">076 6277 835</a>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <p style={{ color: "red" }}>
                      <PhoneOutlined />
                      {` Sales:`}
                    </p>
                  </Col>
                  <Col span={18}>
                    <p>
                      <a href="tel:0779642707">077 964 2707</a>
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form className="contactForm" onFinish={submitForm}>
                <Form.Item>
                  <Input
                    name="Name"
                    placeholder="Name"
                    style={{ borderRadius: "0px" }}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="WhatsApp"
                    placeholder="WhatsApp Number"
                    style={{ borderRadius: "0px" }}
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(Number(e.target.value))}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="Email"
                    type="email"
                    placeholder="Email"
                    style={{ borderRadius: "0px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item>
                  <TextArea
                    value={messageDes}
                    onChange={(e) => setMsg(e.target.value)}
                    style={{ height: 120, resize: "none", borderRadius: "0px" }}
                    showCount
                    maxLength={200}
                    placeholder="Message..."
                  />
                  <button className="submitMessage" type="submit">
                    Submit
                  </button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};

export default ContactUs;
