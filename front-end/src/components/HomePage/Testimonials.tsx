import React, { useState } from "react";
import TsetimonialCard from "./TsetimonialCard";
import { Carousel } from "antd";

const img1: string = new URL(`../../Assets/testimonials/1.png`, import.meta.url)
  .href;

interface propTypes {
  name: string;
  profilePic: string;
  evidencPic: string;
  rating: number;
  description: string;
}

const Testimonials = () => {
  const [scrollbarData, setScrollbarData] = useState<propTypes[]>([
    {
      name: "John Smith",
      profilePic: img1,
      evidencPic: img1,
      rating: 4,
      description: `I've never felt better since I started training at this gym. The
    trainers are amazing and the atmosphere is so motivating. Highly
    recommended!`,
    },
    {
      name: "David willey",
      profilePic: img1,
      evidencPic: img1,
      rating: 3,
      description: `I've never felt better since I started training at this gym. The
    trainers are amazing and the atmosphere is so motivating. Highly
    recommended!`,
    },
    {
      name: "Dale philip",
      profilePic: img1,
      evidencPic: img1,
      rating: 5,
      description: `I've never felt better since I started training at this gym. The
    trainers are amazing and the atmosphere is so motivating. Highly
    recommended!`,
    },
  ]);
  return (
    <div className="testimonials">
      <h2 className="aboutTitle">TESTIMONIALS</h2>
      <Carousel autoplay autoplaySpeed={3000}>
        {scrollbarData.map((item, index) => (
          <>
            <TsetimonialCard
              name={item.name}
              profilePic={item.profilePic}
              evidencPic={item.evidencPic}
              rating={item.rating}
              description={item.description}
            />
          </>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
