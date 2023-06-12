import React, { useState, useEffect } from "react";
import "./NewOrders.css";
import { Form, Input, Modal, message } from "antd";
import newRequest from "../../Utils/newRequest";

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

const OrderModal: React.FC<prop> = ({ open, setOpen, orderId }) => {
  const [title, setTitle] = useState<string>("");
  const [packageType, setPackage] = useState<string>("");
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await newRequest.get(`/orders/single/${orderId}`, {});

        setTitle(res.data.title);
        setPackage(res.data.package);
        setBuyerName(res.data.buyerName);
        setBuyerEmail(res.data.buyerEmail);
        setPrice(res.data.price);
      } catch (err: any) {
        message.error(err.message);
      }
    };
    fetchOrderData();
  }, [open]);
  return (
    <Modal
      title="Order Details"
      open={open}
      footer={null}
      onCancel={() => setOpen(!open)}
    >
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
    </Modal>
  );
};
export default NewOrders;
