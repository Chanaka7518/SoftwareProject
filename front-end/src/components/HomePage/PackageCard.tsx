import React, { useState } from "react";
import { Modal } from "antd";
import { GoCheck } from "react-icons/go";

interface Props {
  title: string;
  description: string;
  photo: string;
}

const PackageCard: React.FC<Props> = ({ title, description, photo }) => {
  const [selectedTitle, setSeletedTitle] = useState<string>("");
  const [isOpen, setIsopen] = useState<boolean>(false);

  const buttonClick = (title: string) => {
    setIsopen(!isOpen);
    setSeletedTitle(title);
  };

  return (
    <div className="pkgCardContainer">
      <div className="cardTitle">{title}</div>
      <div className="pkgIconContainer">
        <img className="packageIcon" src={photo} />
      </div>

      <div className="description">{description}</div>
      <button
        onClick={() => {
          buttonClick(title);
        }}
        className="pkgCardButton"
      >
        View More
      </button>
      <PopUp title={selectedTitle} isOpen={isOpen} setIsOpen={setIsopen} />
    </div>
  );
};

interface modalProps {
  isOpen: boolean;
  title: string;
  setIsOpen: (value: boolean) => void;
}

const PopUp: React.FC<modalProps> = ({ isOpen, title, setIsOpen }) => {
  const [platinamFeatures, setPlatinumFeatures] = useState<string[]>([
    "Personalized workout plans tailored to individual goals and fitness level",
    "Live virtual training sessions with certified trainers",
    "Access to premium workout videos and tutorials",
    "Nutritional guidance and meal planning",
    "Weekly progress tracking and feedback",
    "Unlimited email or messaging support from trainers",
    "Exclusive access to special events or workshops",
    "Premium customer support with priority response time",
  ]);
  const [goldFeatures, setGoldFeatures] = useState<string[]>([
    "Customized workout plans with predefined goals",
    "Virtual training sessions with experienced trainers",
    "Access to a library of workout videos and tutorials",
    "Basic nutritional guidance",
    "Bi-weekly progress tracking and feedback",
    "Limited email or messaging support from trainers",
    "Occasional access to special events or workshops",
    "Standard customer support with reasonable response time",
  ]);
  const [silverFeatures, setSilverFeatures] = useState<string[]>([
    "Pre-designed workout plans for common fitness goals",
    "Access to a selection of workout videos and tutorials",
    "Basic nutritional guidance",
    "Monthly progress tracking",
    "Limited email or messaging support from trainers",
    "Occasional access to special events or workshops",
    "Basic customer support with standard response time",
  ]);
  const [bronzeFeatures, setBronzeFeatures] = useState<string[]>([
    "Predetermined workout plans for general fitness",
    "Access to a limited set of workout videos and tutorials",
    "General nutritional guidance",
    "Basic progress tracking",
    "Limited email or messaging support from trainers",
    "Basic customer support with standard response time",
  ]);

  return (
    <Modal
      onCancel={() => setIsOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{
        className: "modal-cancel-button",
      }}
      title={title}
      open={isOpen}
    >
      <ul>
        {title === "Platinum Package" &&
          platinamFeatures.map((item) => (
            <li style={{ marginBottom: "10px" }}>
              <GoCheck className="check-mark" />
              {item}
            </li>
          ))}
        {title === "Gold Package" &&
          goldFeatures.map((item) => (
            <li style={{ marginBottom: "10px" }}>
              {" "}
              <GoCheck className="check-mark" />
              {item}
            </li>
          ))}
        {title === "Silver Package" &&
          silverFeatures.map((item) => (
            <li style={{ marginBottom: "10px" }}>
              {" "}
              <GoCheck className="check-mark" />
              {item}
            </li>
          ))}
        {title === "Bronze Package" &&
          bronzeFeatures.map((item) => (
            <li style={{ marginBottom: "10px" }}>
              {" "}
              <GoCheck className="check-mark" />
              {item}
            </li>
          ))}
      </ul>
    </Modal>
  );
};

export default PackageCard;
