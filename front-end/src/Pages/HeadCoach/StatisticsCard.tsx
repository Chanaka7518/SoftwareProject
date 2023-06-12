import React from "react";
interface props {
  title: string;
  value: number;
  type: string;
}
const StatisticsCard: React.FC<props> = ({ title, value, type }) => {
  return (
    <div className="dive-card-stat">
      <h3 className="dive-card-title-stat">{title}</h3>
      <p className="dive-card-value-stat">
        {type === "money" && <span>Rs: {value}</span>}
        {type !== "money" && <span> {value}</span>}
      </p>
    </div>
  );
};

export default StatisticsCard;
