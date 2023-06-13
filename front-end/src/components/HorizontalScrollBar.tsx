import React, { useState, useRef } from "react";
import GigCard from "../Pages/ServicesPage/GigCard";
import "./Styles.css";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
type GigDetails = {
  gigId: string;
  gigPhoto: string;
  gigTitle: string;
  sellerName: string;
  rating: number;
  totalSales: number;
};
const sample1OC: string = new URL(
  `../Assets/sample Gig Photos/sample1-oc.png`,
  import.meta.url
).href;
const sample1PT: string = new URL(
  `../Assets/sample Gig Photos/sample1-pt.png`,
  import.meta.url
).href;

const HorizontalScrollBar: React.FC = () => {
  const [bestSellersData, setBestSellersData] = useState<GigDetails[]>([
    {
      gigId: "1",
      gigPhoto: sample1OC,
      gigTitle: "Personalized Online Coaching",
      sellerName: "John Doe",
      rating: 4.9,
      totalSales: 100,
    },
    {
      gigId: "2",
      gigPhoto: sample1PT,
      gigTitle: "1-on-1 Personal Training Sessions",
      sellerName: "Jane Smith",
      rating: 4.7,
      totalSales: 80,
    },
    {
      gigId: "3",
      gigPhoto: sample1OC,
      gigTitle: "Personalized Online Coaching",
      sellerName: "John Doe",
      rating: 4.9,
      totalSales: 100,
    },
    {
      gigId: "4",
      gigPhoto: sample1PT,
      gigTitle: "1-on-1 Personal Training Sessions",
      sellerName: "Jane Smith",
      rating: 4.7,
      totalSales: 80,
    },
  ]);

  // to scroll the cards
  let scrollRef = document.getElementById("slider");
  const handleLeftScroll = () => {
    if (scrollRef) {
      scrollRef.scrollLeft -= 450;
    }
  };
  const handleRightScroll = () => {
    if (scrollRef) {
      scrollRef.scrollLeft += 450;
    }
  };

  return (
    <div className="bar-container">
      <div className="icon-container" onClick={handleLeftScroll}>
        <MdChevronLeft id="left-icon" />
      </div>

      <div id="slider">
        {bestSellersData.map((item) => (
          <div style={{ marginRight: "10px" }}>
            <GigCard
              key={item.gigId}
              gigId={item.gigId}
              gigPhoto={item.gigPhoto}
              gigTitle={item.gigTitle}
              sellerId={item.sellerName}
              rating={item.rating}
              totalSales={item.totalSales}
            />
          </div>
        ))}
      </div>
      <div
        onClick={handleRightScroll}
        className="icon-container icon-container-2"
      >
        <MdChevronRight id="right-icon" />
      </div>
    </div>
  );
};

export default HorizontalScrollBar;
