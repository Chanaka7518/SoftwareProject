import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import newRequest from "../../Utils/newRequest";
const personalTraining: string = new URL(
  `../../Assets/personalTraining.png`,
  import.meta.url
).href;
const onlineCoaching: string = new URL(
  `../../Assets/onlineCoaching.png`,
  import.meta.url
).href;
const Services = () => {
  const navigateTo = useNavigate();
  return (
    <div className="mainServicesContainer">
      <h2 className="aboutTitle">Services</h2>
      <div className="serviceContainer toReverse">
        <div className="aboutService">
          <h1 className="serviceTitle">Personal Training</h1>
          <p className="description">
            Personal Training program offers one-on-one instruction with our
            qualified fitness professionals, either in person or remotely. Our
            Personal Trainers will work closely with you to create a customized
            workout plan that fits your fitness level, preferences, and goals.
            They will provide guidance on proper form and technique, offer
            motivation and accountability, and help you push past your limits to
            achieve your fitness goals.
          </p>
          <button className="btn" onClick={() => navigateTo("/services")}>
            Buy Now
          </button>
        </div>
        <div className="servicePhoto">
          <img src={personalTraining} alt="Personal Training" />
        </div>
      </div>
      <div className="serviceContainer">
        <div className="servicePhoto">
          <img src={onlineCoaching} alt="Online Training" />
        </div>
        <div className="aboutService">
          <h1 className="serviceTitle">Online Coaching</h1>
          <p className="description">
            Online Coaching program is designed to create a customized fitness
            plan tailored to your unique goals and needs. This includes
            personalized workout routines, nutrition guidance, and lifestyle
            recommendations. Through online communication channels such as
            email, video calls, or alpha lee platforms, our fitness
            professionals will provide you with the guidance and support you
            need to achieve your fitness goals on your schedule.
          </p>
          <button className="btn" onClick={() => navigateTo("/services")}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
