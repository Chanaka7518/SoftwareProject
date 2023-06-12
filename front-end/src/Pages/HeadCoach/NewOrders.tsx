import React, { useState, useEffect, useRef } from "react";
import "./NewOrders.css";
import { Button, Form, Modal, Spin, Upload, message } from "antd";
import newRequest from "../../Utils/newRequest";
import { storage } from "../../Firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { UploadOutlined } from "@ant-design/icons";

interface orders {
  ordersToDeliver: string[];
}

const NewOrders: React.FC<orders> = ({ ordersToDeliver }) => {
  const [currentOrder, setCurrentOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const onView = (orderId: string) => {
    setCurrentOrder(orderId);
    setOpen(!open);
  };
  return (
    <>
      <div className="order-accept">
        {ordersToDeliver?.map((orderId, index) => (
          <p className="accept-single-order">
            Order-{index + 1}{" "}
            <button onClick={() => onView(orderId)}>View</button>
          </p>
        ))}
      </div>
      <OrderModal open={open} setOpen={setOpen} orderId={currentOrder} />
    </>
  );
};

interface prop {
  open: boolean;
  setOpen: (value: boolean) => void;
  orderId: string;
}

//-------------order modal--------------

const OrderModal: React.FC<prop> = ({ open, setOpen, orderId }) => {
  const [title, setTitle] = useState<string>("");
  const [packageType, setPackage] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [sellerId, setSellerId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [url, setUrl] = useState<string>();
  const data = useRef<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //handling uploading
  const handleUpload = (file: File) => {
    if (file.type.includes("application/pdf")) {
      // Handle the image upload here
      data.current = file;
      handleSubmitImage(file);
    } else {
      data.current = undefined;
      setUrl("");
      return message.error("Only pdf files are allowed.");
    }
  };
  //handling removing
  const removeFiles = () => {
    data.current = undefined;
    setUrl("");
  };

  const handleSubmitImage = (file: File) => {
    setIsLoading(true);
    const storageRef = ref(storage, `workouts/${file.name}`);
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

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await newRequest.get(`/orders/single/${orderId}`, {});

        setTitle(res.data.title);
        setPackage(res.data.package);
        setBuyerName(res.data.buyerName);
        setBuyerEmail(res.data.buyerEmail);
        setPrice(res.data.price);
        setSellerId(res.data.sellerId);
      } catch (err: any) {
        message.error(err.message);
      }
    };
    fetchOrderData();
  }, [open]);

  const deleverWorkout = async () => {
    setIsLoading(true);
    try {
      const res = await newRequest.post(`/orders/update/${orderId}`, {
        sellerId: sellerId,
        workoutLink: url,
      });
      console.log(res.data);
      setIsLoading(false);
    } catch (err: any) {
      message.error(err.message);
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Order Details"
      open={open}
      footer={null}
      onCancel={() => setOpen(!open)}
    >
      <Spin spinning={isLoading}>
        <h1 style={{ width: "100%", color: "red", textAlign: "center" }}>
          {title}
        </h1>
        <div
          style={{
            height: "30px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ width: "100px" }}>Package Type - </p>
          <span style={{ color: "rgb(0, 240, 160)" }}>{packageType}</span>
        </div>
        <div
          style={{
            height: "30px",

            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ width: "100px" }}>Price -</p>{" "}
          <span style={{ color: "rgb(0, 240, 160)" }}>{price}</span>
        </div>
        <div
          style={{
            height: "30px",

            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ width: "100px" }}>Buyer Name - </p>
          <span style={{ color: "rgb(0, 240, 160)" }}>{buyerName}</span>
        </div>
        <div
          style={{
            height: "30px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ width: "100px" }}>Buyer Email - </p>
          <span style={{ color: "rgb(0, 240, 160)" }}>{buyerEmail}</span>
        </div>
        <div className="">
          <Form.Item label="Upload  Workout plan as a pdf:">
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
          <button
            type="submit"
            className="workout-deliver-button"
            onClick={deleverWorkout}
          >
            Deliver
          </button>
          <button
            className="workout-deliver-cancell-button"
            onClick={() => setOpen(!open)}
          >
            Cancell
          </button>
          {orderId}
        </div>
      </Spin>
    </Modal>
  );
};
export default NewOrders;
