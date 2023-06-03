import React, { useState } from "react";
import "./Styles.css";
import { useNavigate } from "react-router";
import ClientGigView from "../Client Views/ClientGigView";

type GigCardProps = {
  gigId: string;
  gigPhoto: string;
  gigTitle: string;
  sellerName: string;
  rating: number;
  totalSales: number;
};

const GigCard: React.FC<GigCardProps> = ({
  gigId,
  gigPhoto,
  gigTitle,
  sellerName,
  rating,
  totalSales,
}) => {
  const navigateTo = useNavigate();
  const [selectedGig, setSelectedGig] = useState<GigCardProps>({
    gigId: gigId,
    gigPhoto: gigPhoto,
    gigTitle: gigTitle,
    sellerName: sellerName,
    rating: rating,
    totalSales: totalSales,
  });

  const onButtonClick = (gigId: string, sellerName: string) => {
    navigateTo(`/services/${sellerName}/${gigId}`);
  };

  return (
    <div className="gig-card">
      <img className="gig-photo" src={gigPhoto} alt="Gig Photo" />
      <h3 className="gig-title-1">{gigTitle}</h3>
      <p className="seller-name">{sellerName}</p>
      <div className="rating">
        <span className="rating-stars">{rating} stars</span>
        <span className="total-sales">{totalSales} total sales</span>
      </div>
      <button
        className="hire-now-button"
        onClick={() => onButtonClick(gigId, sellerName)}
      >
        Buy Now
      </button>
      {false && <ClientGigView gigId={gigId} />}
    </div>
  );
};

export default GigCard;
