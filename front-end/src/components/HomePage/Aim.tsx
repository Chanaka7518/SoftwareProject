import React from "react";
const imgAim: string = new URL(
  `../../Assets/aimBackground.png`,
  import.meta.url
).href;
const Aim = () => {
  return (
    <div className="companyAim">
      <img src={imgAim} alt="Alpha lee" />
      <h2 className="aimTitle">Our Aim</h2>
      <p className="aim">
        <span style={{ fontSize: "20px", fontWeight: "800" }}>"</span>Connect
        fitness enthusiasts with expert coaches through a user-friendly
        platform. We strive to empower individuals to achieve their fitness
        goals by providing personalized training programs and delivering
        top-notch service
        <span style={{ fontSize: "20px", fontWeight: "800" }}>"</span>
      </p>
    </div>
  );
};

export default Aim;
