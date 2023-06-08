import React from "react";
import "./SellerApplication.css";
import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";

const gif: string = new URL(
  `../../../Assets/Gifs/seller_form.gif`,
  import.meta.url
).href;

const SellerApplication: React.FC = () => {
  return (
    <div className="seller_application_container">
      <div>
        <h1 className="seller-form-title">Seller Application</h1>
        <form className="seller-form">
          {/* Input fields */}
          <Form.Item>
            <label className="seller-labels" htmlFor="fname">
              First Name:
            </label>
            <Input className="seller-inputs" id="fname" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="lname">
              Last Name:
            </label>
            <Input className="seller-inputs" id="lname" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="age">
              Age:
            </label>
            <Input className="seller-inputs" id="age" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="gender">
              Gender:
            </label>

            <Select
              className="seller-inputs"
              id="gender"
              placeholder="select your gender"
              // value={gender}
              // onChange={(gender) => setGender(gender)}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="nic">
              Nic Number:
            </label>
            <Input className="seller-inputs" id="nic" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="address">
              Address:
            </label>
            <Input className="seller-inputs" id="address" />
          </Form.Item>

          <Form.Item>
            <label className="seller-labels" htmlFor="mobile">
              Mobile Number:
            </label>
            <Input className="seller-inputs" id="mobile" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="whatsapp">
              WhatsApp Number:
            </label>
            <Input className="seller-inputs" id="whatsapp" />
          </Form.Item>

          <Form.Item>
            <label className="seller-labels" htmlFor="email">
              Email:
            </label>
            <Input className="seller-inputs" id="email" />
          </Form.Item>

          <Form.Item>
            <label className="seller-labels" htmlFor="qualfications">
              Qualifications:
            </label>
            <Input className="seller-inputs" id="qualfications" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="achievments">
              Athletic achievements:
            </label>
            <Input className="seller-inputs" id="achievments" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="experience">
              Work Experience:
            </label>
            <Input className="seller-inputs" id="experience" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="web">
              Website:
            </label>
            <Input className="seller-inputs" id="web" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="facebook">
              Facebook:
            </label>
            <Input className="seller-inputs" id="facebook" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="insta">
              Instagram:
            </label>
            <Input className="seller-inputs" id="insta" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="tiktok">
              TikTok:
            </label>
            <Input className="seller-inputs" id="tiktok" />
          </Form.Item>
          <Form.Item>
            <label className="seller-labels" htmlFor="des">
              Short Description:
            </label>
            <Input className="seller-inputs" id="des" />
          </Form.Item>

          {/* More input fields... */}

          {/* Submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SellerApplication;
