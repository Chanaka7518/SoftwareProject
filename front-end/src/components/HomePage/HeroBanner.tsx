import React from "react";
import "./style.css";
import { Button } from "antd";
import { useNavigate } from "react-router";
const img: string = new URL(`../../Assets/heroBanner.png`, import.meta.url)
  .href;
const HeroBanner = () => {
  const navigateTo = useNavigate();
  return (
    <div className="heroContainer">
      <img src={img} alt="Alpha Lee Fitness" />
      <h1 className="heroTitle">ALPHA LEE</h1>
      <h2 className="heroSubtitle">FITNESS</h2>
      <p className="heroDescription">
        Unleash Your Potential - Online Coaching & Personal Training. Achieve
        Your Fitness Goals with Customized Plans, Expert Guidance & Ongoing
        Support. Elevate Your Fitness Journey Now!
      </p>
      <button className="btn" onClick={() => navigateTo("/services")}>
        Buy Now
      </button>
    </div>
  );
};

export default HeroBanner;
