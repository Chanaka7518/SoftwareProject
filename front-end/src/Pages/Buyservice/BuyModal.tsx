import { Form, Input, Modal, Select } from "antd";
import React, { useState, useEffect } from "react";
import { Option } from "antd/es/mentions";
import "./Styles.css";
import PaymentDetailsModal from "./PaymentDetailsModal";

interface Price {
  onlineCoaching: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
  personalTraining: {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
  };
}
interface Data {
  gigId: string;
  gigTitle: string;
  sellerId: string;
  sellerName: string;
  category: string;
  isOpen: boolean;
  price: Price;
  setIsOpen: (value: boolean) => void;
}
const BuyModal: React.FC<Data> = ({
  setIsOpen,
  sellerName,
  category,
  isOpen,
  price,
}) => {
  const [sellingPrice, setSellingPrice] = useState<number>();
  const [pkg, setPkg] = useState<string>("");

  const handlePackageChange = (value: string) => {
    setPkg(value);
  };

  useEffect(() => {
    if (category === "Online Coaching") {
      if (pkg === "Platinum Package") {
        setSellingPrice(price.onlineCoaching.platinum);
      } else if (pkg === "Gold Package") {
        setSellingPrice(price.onlineCoaching.gold);
      } else if (pkg === "Silver Package") {
        setSellingPrice(price.onlineCoaching.silver);
      } else if (pkg === "Bronze Package") {
        setSellingPrice(price.onlineCoaching.bronze);
      }
    }
    if (category === "Personal Training") {
      if (pkg === "Platinum Package") {
        setSellingPrice(price.personalTraining.platinum);
      } else if (pkg === "Gold Package") {
        setSellingPrice(price.personalTraining.gold);
      } else if (pkg === "Silver Package") {
        setSellingPrice(price.personalTraining.silver);
      } else if (pkg === "Bronze Package") {
        setSellingPrice(price.personalTraining.bronze);
      }
    }
  }, [pkg, category, price]);

  const [open, setOpen] = useState<boolean>(false);

  const handlePaymentDetailsModal = () => {
    setOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <PaymentDetailsModal
        open={open}
        setOpen={setOpen}
        sellingPrice={sellingPrice}
      />
      <Modal
        visible={isOpen}
        title={null}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        <div className="buy-service-page">
          <div className="buying-details">
            <Form layout="vertical">
              <Form.Item style={{ fontWeight: "bold" }} label="Service">
                <p style={{ fontWeight: "normal", margin: "0px" }}>
                  {category}
                </p>
              </Form.Item>

              <Form.Item style={{ fontWeight: "bold" }} label="Package">
                <Select
                  onChange={handlePackageChange}
                  placeholder="Choose a package"
                >
                  <Option value="Platinum Package">Platinum Package</Option>
                  <Option value="Gold Package">Gold Package</Option>
                  <Option value="Silver Package">Silver Package</Option>
                  <Option value="Bronze Package">Bronze Package</Option>
</Select>
</Form.Item>
<Form.Item style={{ fontWeight: "bold" }} label="Seller">
<Input value={sellerName} disabled />
</Form.Item>
</Form>
<Form.Item style={{ fontWeight: "bold" }} label="Price">
<span style={{ color: "gray", fontSize: "25px" }}>
LKR {sellingPrice}
</span>
</Form.Item>
<Form.Item className="buy-btn-container">
<button className="pay-now-btn pay" onClick={handlePaymentDetailsModal}>Pay Now</button>
<button
className="pay-now-btn cancell"
onClick={() => setIsOpen(false)}
>
Cancel
</button>
</Form.Item>
</div>
</div>
</Modal>
</>
);
};

export default BuyModal;
