import React, { useEffect, useState } from "react";
import "./Style.css";
import newRequest from "../../Utils/newRequest";
import { Modal, Popconfirm, message } from "antd";

interface User {
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  nicNo: string;
  gender: string;
  moNumber: string;
  whatsApp: string;
  lLine: string;
  email: string;
  webSite: string;
  athleticArchievements: [string];
  experiences: [string];
  role: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  certifictes: {
    urls: string;
    pdfData: [any];
  };
  isAppliedAsSeller: boolean;
  isAcceptedSeller: boolean;
  _id: string;
}
const DisplayApplication: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await newRequest.get("/approve/applications", {});
        console.log(res.data);
        setUsers(res.data);
        console.log(users);
      } catch (err: any) {
        message.error(err);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [coachId, setCoachId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onRejectButton = (coachId: string, email: string) => {
    setOpen(true);
    setCoachId(coachId);
    setEmail(email);
  };

  return (
    <div>
      {users.map((user, index) => (
        <div className="application-view-container">
          <div className="Application-count">{index + 1}</div>
          <div className="applicant-name">{user.firstName}</div>
          <div className="applicant-email">{user.email}</div>
          <div className="application-buttons">
            <button className="review-btn">Review</button>

            <button
              className="reject-btn"
              onClick={() => onRejectButton(user._id, user.email)}
            >
              Reject
            </button>
          </div>
          <ConfirmModal
            open={open}
            setOpen={setOpen}
            coachId={coachId}
            email={email}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayApplication;

interface prop {
  open: boolean;
  setOpen: (value: boolean) => void;
  coachId: string;
  email: string;
}

const ConfirmModal: React.FC<prop> = ({ open, setOpen, coachId, email }) => {
  const confirm = async () => {
    setOpen(!open);

    try {
      const res = await newRequest.post(
        `/approve/application/reject/${coachId}`,
        {
          email: email,
        }
      );
      message.success(res.data);
    } catch (err: any) {
      message.error(err);
    }
  };

  const cancel = () => {
    setOpen(!open);
  };

  return (
    <Modal title="Modal" open={open} footer={null}>
      <p>Are you sure to reject this application</p>
      {coachId}
      <button onClick={confirm}>Reject</button>
      <button onClick={cancel}>Cancell</button>
    </Modal>
  );
};
