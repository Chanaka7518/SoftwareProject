import React from "react";
import { useNavigate } from "react-router";
interface props {
  title: string;
  value: number;
  type: string;
  setViewOrders: (value: boolean) => void;
  viewOrders: boolean;
}
const StatisticsCard: React.FC<props> = ({
  title,
  value,
  type,
  viewOrders,
  setViewOrders,
}) => {
  const navigateTo = useNavigate();
  return (
    <div className="dive-card-stat">
      <h3 className="dive-card-title-stat">{title}</h3>
      <p className="dive-card-value-stat">
        {type === "money" && <span>Rs: {value}</span>}
        {type !== "money" && <span> {value}</span>}
        {title === "To Deliver" && (
          <button
            className="stat-viiew-btn"
            style={{
              width: "50px",
              height: "20px",
              color: "white",
              background: "rgb(0, 240, 160)",
              border: "1px solid rgb(0, 240, 160)",
            }}
            onClick={() => setViewOrders(!viewOrders)}
          >
            View
          </button>
        )}
      </p>
    </div>
  );
};

export default StatisticsCard;
