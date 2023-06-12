

import { Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./Styles.css";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  sellingPrice?: number;
}

const PaymentDetailsModal: React.FC<Props> = ({ open, setOpen, sellingPrice }) => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [nameOnCard, setNameOnCard] = useState<string>("");
  const [expireMonth, setExpireMonth] = useState<string>("");
  const [expireYear, setExpireYear] = useState<string>("");
  const [cardSecurityCode, setCardSecurityCode] = useState<string>("");

  useEffect(() => {
    // Handle any other side effects here
  }, []);

  return (
    <Modal
      visible={open}
      title={null}
      footer={null}
      onCancel={() => setOpen(false)}
    >
      <div className="buy-service-page">
        <div className="buying-details">
          <h1 className="CardDetails">Card Details</h1>
          <Form layout="vertical">
            <Form.Item style={{ fontWeight: "bold" }} label="Card Number">
              <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </Form.Item>

            <Form.Item style={{ fontWeight: "bold" }} label="Name on Card">
              <Input value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
            </Form.Item>

            <div style={{ display: "flex" }}>
              <Form.Item style={{ fontWeight: "bold", marginRight: "8px" }} label="Expire Date">
                <Input value={expireMonth} onChange={(e) => setExpireMonth(e.target.value)} />
              </Form.Item>

              <Form.Item style={{ fontWeight: "bold" }} label="Year">
                <Input value={expireYear} onChange={(e) => setExpireYear(e.target.value)} />
              </Form.Item>
            </div>

            <Form.Item style={{ fontWeight: "bold" }} label="Card Security Code">
              <Input value={cardSecurityCode} onChange={(e) => setCardSecurityCode(e.target.value)} />
            </Form.Item>

            {sellingPrice && (
              <Form.Item style={{ fontWeight: "bold" }} label="Price">
                <span style={{ color: "gray", fontSize: "25px" }}>
                  LKR {sellingPrice}
                </span>
              </Form.Item>
            )}

            <Form.Item className="buy-btn-container">
              <button className="pay-now-btn pay">Pay Now</button>
              <button
              className="pay-now-btn cancell"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </Modal>
  );
};

export default PaymentDetailsModal;
