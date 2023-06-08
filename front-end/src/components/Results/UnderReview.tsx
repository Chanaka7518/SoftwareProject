import React from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
const gif: string = new URL(`../../Assets/Gifs/user.gif`, import.meta.url).href;

const UnderReview = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="under_review_container">
      <div className="under_review_left">
        <p className="Alpha-lee">ALPHA LEE</p>
        <p className="fitness">Fitness</p>
      </div>
      <div className="under_review_right">
        <img
          src={gif}
          alt="Beautiful Image"
          style={{ width: "150px", height: "160px" }}
        />
        <h1
          className="msg-1"
          style={{ color: "rgb(5, 218, 94)", textAlign: "center" }}
        >
          Your account is being reviewed
        </h1>
        <p
          className="hours-to-wait"
          style={{ color: "red", fontWeight: "bold", textAlign: "center" }}
        >
          It may take up to 72hrs
        </p>

        <button className="under_review_back_btn" onClick={backToHome}>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default UnderReview;
