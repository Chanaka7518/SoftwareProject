import { Col, Form, Input, Row } from "antd";
import React from "react";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const ContactUs = () => {
  return (
    <div className="contact">
      <h2 className="aboutTitle">CONTACT US</h2>
      <div className="formAndDetails">
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
            <Form className="contactForm">
              <Form.Item>
                <Input placeholder="Name" style={{ borderRadius: "0px" }} />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="WhatsApp Number"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="email"
                  placeholder="Email"
                  style={{ borderRadius: "0px" }}
                />
              </Form.Item>
              <Form.Item>
                <Input.TextArea
                  bordered
                  style={{ height: 120, resize: "none", borderRadius: "0px" }}
                  showCount
                  maxLength={200}
                  placeholder="Message..."
                />
                <button className="submitMessage">Submit</button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
