import React, { useState } from "react";
import { Form, Input, message } from "antd";

interface props {
  fb: string;
  insta: string;
  tiktok: string;
  setFb: (value: string) => void;
  setInsta: (value: string) => void;
  setTiktok: (value: string) => void;
}
const SocialAccounts: React.FC<props> = ({
  fb,
  insta,
  tiktok,
  setFb,
  setInsta,
  setTiktok,
}) => {
  const facebook: string = new URL(`./facebook.png`, import.meta.url).href;
  const instagram: string = new URL(`./instagram.png`, import.meta.url).href;
  const tiktokicon: string = new URL(`./tik-tok.png`, import.meta.url).href;

  return (
    <div>
      <Form>
        <Form.Item name="fb" initialValue={fb}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img
              src={facebook}
              style={{
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <Input
            style={{ borderRadius: "0px" }}
            onChange={(e) => setFb(e.target.value)}
            value={fb}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img src={instagram} style={{ width: "60px", height: "60px" }} />
          </div>
          <Input
            style={{ borderRadius: "0px" }}
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5px",
            }}
          >
            <img src={tiktokicon} style={{ width: "60px", height: "60px" }} />
          </div>
          <Input
            style={{ borderRadius: "0px" }}
            value={tiktok}
            onChange={(e) => setTiktok(e.target.value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default SocialAccounts;
