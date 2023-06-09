import { Carousel, Rate, Typography } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

interface propTypes {
  name: string;
  profilePic: string;
  evidencPic: string;
  rating: number;
  description: string;
}

const TsetimonialCard: React.FC<propTypes> = ({
  name,
  profilePic,
  evidencPic,
  rating,
  description,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="carousel-wrapper">
      <div className="testimonial-card">
        <div className="compareImg">
          <img src={evidencPic} alt="Client Photo" />
        </div>
        <div className="testimonial-content">
          <div className="testimonial-image">
            <img src={profilePic} alt="Profile Photo" />
          </div>
          <div className="rate">
            <Rate disabled defaultValue={rating} allowHalf />
          </div>

          <div>
            <p className="testimonial-description">{description}</p>
            <p className="testimonial-client-name">- {name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TsetimonialCard;
