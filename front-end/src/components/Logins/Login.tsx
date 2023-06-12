import React, { useState } from "react";

import { Form, Input } from "antd";
import axios from "axios";
const Login = () => {
  const [file, setFile] = useState<any>(null);

  const upload = async (file: any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "AlphaLee");

    // try {
    //   const res = await axios.post()
    // } catch (err) {
    //   console.log(err);
    // }
  };
  return (
    <div className="signup-container">
      <Form layout="vertical" className="signup-form">
        <h2>Log in</h2>
        <Form.Item>
          <Input
            type="email"
            placeholder="First Name"
            className="input"
            //   value={firstName}
            //   onChange={(event) => setFirstName(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            placeholder="Last Name"
            className="input"
            //   value={lastName}
            //   onChange={(event) => setLastName(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input type="file" onChange={(e) => e.target.files} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
