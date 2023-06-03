import React from "react";
import { useNavigate } from "react-router";
const img: string = new URL(`../../Assets/aboutUs.png`, import.meta.url).href;

const AboutUs = () => {
  const navigateTo = useNavigate();
  return (
    <div className="AboutUs" id="aboutus">
      <h2 className="aboutTitle">About Us</h2>
      <div className="aboutBoxes">
        <div className="AboutImgContainer1">
          <img src={img} />
        </div>
        <div className="AboutImgContainer2">
          <div style={{ width: "100%", height: "100%" }}>
            <h3>Who we are?</h3>
            <p style={{ color: "gray" }}>
              we are a one-stop destination for fitness enthusiasts to find and
              connect with expert coaches. Our platform brings together a
              diverse and talented community of certified fitness coaches who
              offer a wide range of specialized training programs. Whether
              you're looking for personalized workout plans, nutrition guidance,
              or lifestyle coaching, our platform provides a seamless and
              convenient way to access the services you need to achieve your
              fitness goals.
            </p>
            <h3>Why should you choose us?</h3>
            <p style={{ color: "gray" }}>
              We are committed to delivering a top-notch experience for our
              buyers, providing a secure and reliable platform, and empowering
              individuals to transform their health and fitness. Join us today
              and take the first step towards unlocking your full fitness
              potential!
            </p>
            <button className="btn" onClick={() => navigateTo("/services")}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
