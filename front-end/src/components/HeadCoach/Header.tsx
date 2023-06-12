import React from "react";

const Header = () => {
  const img1: string = new URL(`../../Pages/profile.png`, import.meta.url).href;
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        backgroundColor: "rgba(0,255,0,0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <img
        src={img1}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    </div>
  );
};

export default Header;
