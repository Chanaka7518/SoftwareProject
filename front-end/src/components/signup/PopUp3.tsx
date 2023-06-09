import React, { useRef, useState } from "react";
import { UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Modal, message, Upload, Space, Col, Spin } from "antd";

// importing firebase modules
import { storage } from "../../Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  visible3: boolean;
  handleNext3: () => void;
  handleCancel3: (values: any) => void;
  handleprevious3: () => void;
  onFinish: (downloadUrls: string[], pdfData: any[]) => void;
}

//-------------------------------------------------------------------------------------------------------------------------------------------

const PopUp3: React.FC<Props> = ({
  handleNext3,
  handleprevious3,
  handleCancel3,
  visible3,
  onFinish,
}) => {
  const urls = useRef<any[]>([]);
  const data = useRef<string[]>([]);
  const handleUpload = (file: any) => {
    data.current.push(file);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const promises = data.current.map((file: any) => {
      const storageRef = ref(storage, `certificates/${file.name}`);
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
            });
          }
        );
      });
    });

    Promise.all(promises)
      .then((downloadURLs: any) => {
        console.log("All files uploaded successfully");
        urls.current.push(downloadURLs);
        console.log(urls.current[0]);
        onFinish(urls.current[0], data.current);
        handleNext3();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });

    //########## this is from chatgpt to delete the file from firebase################

    // // Get a reference to the Firebase Storage service
    // var storageRef = firebase.storage().ref();

    // // Get a reference to the file using the uid
    // var fileRef = storageRef.child("rc-upload-1678946576370-18");

    // // Delete the file
    // fileRef
    //   .delete()
    //   .then(function () {
    //     console.log("File deleted successfully!");
    //   })
    //   .catch(function (error) {
    //     console.error("Error deleting file: ", error);
    //   });
  };

  return (
    <>
      <Modal
        title="Sign Up"
        open={visible3}
        onCancel={handleCancel3}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        footer={[
          <Space direction="vertical" style={{ width: "100%" }}>
            <Form.Item>
              <Button
                loading={isLoading}
                style={{ width: "100%" }}
                onClick={handleSubmit}
                type="primary"
              >
                Next
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{
                  width: "100%",
                  color: "#8794fa",
                  borderColor: "#8794fa",
                }}
                danger={true}
                onClick={handleprevious3}
              >
                Back
              </Button>
            </Form.Item>
          </Space>,
        ]}
      >
        <div className="header">
          <h1>Are You Paper Qualified?</h1>
          <div className="text-container">
            <p className="text-1">
              List down all your paper qualifications to be a fitness coach
            </p>
          </div>
          <h2>"A coach who stops learning, stops growing"</h2>
        </div>

        <h3 className="sub-heading">Your list of qualifications</h3>

        <Form className="form" name="paperqulified">
          <Form.Item
            style={{
              width: "100%",
            }}
          >
            <Col span={24}>
              <Upload
                style={{ width: "100%" }}
                beforeUpload={(file) => {
                  handleUpload(file);
                  return false;
                }}
                multiple
              >
                <Button style={{ width: "100%" }} icon={<UploadOutlined />}>
                  Select File
                </Button>
              </Upload>
            </Col>
          </Form.Item>

          {/* <div>
          {urls.current.map((url: any, index: number) => (
            <div key={index}>{url}</div>
          ))}
        </div> */}
        </Form>
      </Modal>
    </>
  );
};

export default PopUp3;
