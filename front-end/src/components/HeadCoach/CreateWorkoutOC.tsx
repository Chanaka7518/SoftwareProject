import { Button, Form, Input, Upload, message, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useRef } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { storage } from "../../Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import "./CreateWorkoutPlans.css";
import newRequest from "../../Utils/newRequest";
import { useNavigate } from "react-router";

interface price {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

const CreateWorkoutOC: React.FC = () => {
  const navigateTo = useNavigate();
  let price: price;
  const [url, setUrl] = useState<string>();
  const data = useRef<File>();
  const [title, setTitle] = useState<string>("");
  const [des, setDes] = useState<string>("");
  const [bronze, setBronze] = useState<number>(0);
  const [silver, setSilver] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const [platinum, setPlatinum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //handling uploading
  const handleUpload = (file: File) => {
    if (file.type.includes("image")) {
      // Handle the image upload here
      data.current = file;
      handleSubmitImage(file);
    } else {
      return message.error("Only image files are allowed.");
    }
  };

  //handling removing
  const removeFiles = () => {
    data.current = undefined;
    setUrl("");
  };

  const handleSubmitImage = (file: File) => {
    setIsLoading(true);
    const storageRef = ref(storage, `gigcovers/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            resolve(downloadURL);
            setUrl(downloadURL);
            setIsLoading(false);
          });
        }
      );
    });
  };

  const submitForm = async () => {
    price = {
      platinum: platinum,
      gold: gold,
      silver: silver,
      bronze: bronze,
    };
    setIsLoading(true);

    try {
      const res = await newRequest.post("/gigs", {
        Title: title,
        des: des,
        category: "Online Coaching",
        gigPhoto: url,
        price: price,
      });

      message.success(res.data);
      navigateTo("/dashboard");

      setIsLoading(false);
    } catch (err: any) {
      console.log(err.message);
      message.error(err.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="workout-creation-div">
      <Spin spinning={isLoading}>
        <Form layout="vertical" onFinish={submitForm}>
          <h2 className="create-workout-title" style={{ color: "red" }}>
            Create Online Coaching Plan
          </h2>
          <Form.Item label="Category:">
            <Input
              disabled
              value="Online Coaching"
              className="workout-creation-input"
              style={{ borderRadius: "0px" }}
            />
          </Form.Item>
          <Form.Item label="Title:">
            <Input
              className="workout-creation-input"
              style={{ borderRadius: "0px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Prices">
            <Form.Item
              name="Bronze Package"
              label={
                <span style={{ color: "#778da9" }}>Bronze Package (Rs.)</span>
              }
              style={{ fontStyle: "italic" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && isNaN(value)) {
                      return Promise.reject("Please enter a valid price");
                    }
                    if (value && Number(value) <= 0) {
                      return Promise.reject(
                        "Please enter a price greater than 0"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="workout-creation-input"
                style={{ borderRadius: "0px" }}
                value={bronze}
                onChange={(e) => setBronze(Number(e.target.value))}
                required
              />
            </Form.Item>
            <Form.Item
              name="Silver Package"
              label={
                <span style={{ color: "#778da9" }}>Silver Package (Rs.)</span>
              }
              style={{ fontStyle: "italic" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && isNaN(value)) {
                      return Promise.reject("Please enter a valid price");
                    }
                    if (value && Number(value) <= 0) {
                      return Promise.reject(
                        "Please enter a price greater than 0"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="workout-creation-input"
                style={{ borderRadius: "0px" }}
                value={silver}
                onChange={(e) => setSilver(Number(e.target.value))}
                required
              />
            </Form.Item>
            <Form.Item
              name="Gold Package"
              label={
                <span style={{ color: "#778da9" }}>Gold Package (Rs.)</span>
              }
              style={{ fontStyle: "italic" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && isNaN(value)) {
                      return Promise.reject("Please enter a valid price");
                    }
                    if (value && Number(value) <= 0) {
                      return Promise.reject(
                        "Please enter a price greater than 0"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="workout-creation-input"
                style={{ borderRadius: "0px" }}
                value={gold}
                onChange={(e) => setGold(Number(e.target.value))}
                required
              />
            </Form.Item>
            <Form.Item
              name="Platinum Package"
              label={
                <span style={{ color: "#778da9" }}>Platinum Package (Rs.)</span>
              }
              style={{ fontStyle: "italic" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value && isNaN(value)) {
                      return Promise.reject("Please enter a valid price");
                    }
                    if (value && Number(value) <= 0) {
                      return Promise.reject(
                        "Please enter a price greater than 0"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                className="workout-creation-input"
                style={{ borderRadius: "0px" }}
                value={platinum}
                onChange={(e) => setPlatinum(Number(e.target.value))}
                required
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Description:">
            <TextArea
              showCount
              allowClear
              maxLength={300}
              rows={6}
              style={{ height: 120 }}
              placeholder="Tell customers about your service"
              value={des}
              onChange={(e) => setDes(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Gig Cover Photo:">
            {url && (
              <img style={{ width: "500px", height: "250px" }} src={url} />
            )}
            <p style={{ color: "rgb(5, 218, 94)" }}>
              Upload 1000 * 500 photo for best quality
            </p>
            <Upload
              beforeUpload={(file) => {
                handleUpload(file);

                return false;
              }}
              onRemove={removeFiles}
              multiple
            >
              <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                Select File
              </Button>
            </Upload>
          </Form.Item>
          <button type="submit" className="workout-creation-button">
            Submit
          </button>
          <button type="submit" className="workout-creation-cancel-button">
            Submit
          </button>
        </Form>
      </Spin>
    </div>
  );
};

export default CreateWorkoutOC;
