import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";

interface props {
  firstName: string;
  lastName: string;
  pwd: string;
  gender: string;
  disabled: boolean;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setPwd: (value: string) => void;
  setGender: (value: string) => void;
  setDisabled: (value: boolean) => void;
}

const Step1: React.FC<props> = ({
  firstName,
  lastName,
  pwd,
  gender,
  disabled,
  setFirstName,
  setLastName,
  setPwd,
  setGender,
  setDisabled,
}) => {
  useEffect(() => {
    if (!pwd || !firstName || !lastName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [firstName, lastName, pwd, gender]);
  useEffect(() => {
    if (!pwd || !firstName || !lastName) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  return (
    <div>
      <h2>Step 1: Personal Information</h2>

      <div className="custom-input" style={{ width: "100%" }}>
        <Form.Item
          name="firstName"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your first name",
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
            size="middle"
            placeholder="First Name"
            className="square-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Last Name can only contain letters",
            },
            {
              min: 4,
              message: "Last Name must have at least 4 characters",
            },
          ]}
        >
          <Input
            size="middle"
            placeholder="Last Name"
            className="square-input"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </Form.Item>

        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject("You must have a password");
                }

                return Promise.resolve();
              },
            },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
              message:
                "Password must contain at least one letter, one number, and one special character",
            },
            {
              min: 8,
              message: "Password must have at least 8 characters",
            },
          ]}
        >
          <Input.Password
            className="square-input"
            placeholder="Password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
        </Form.Item>

        <Form.Item
          name="ConfirmP_assword"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            className="square-input"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[
            {
              // required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select
            placeholder="select your gender"
            value={gender}
            onChange={(gender) => setGender(gender)}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        {disabled && (
          <p style={{ textAlign: "center", color: "red", margin: "0px" }}>
            Please Fill all the fiels
          </p>
        )}
      </div>
    </div>
  );
};

export default Step1;
