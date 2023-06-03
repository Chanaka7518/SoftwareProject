import React, { useState } from "react";
import GigCard from "./GigCard";
import "./Styles.css";
import NavBar from "../../components/NavBar";
import { Menu } from "antd";
import HorizontalScrollBar from "../../components/HorizontalScrollBar";
import Footer from "../../components/Footer";

const sample1OC: string = new URL(
  `../../Assets/sample Gig Photos/sample1-oc.png`,
  import.meta.url
).href;
const sample1PT: string = new URL(
  `../../Assets/sample Gig Photos/sample1-pt.png`,
  import.meta.url
).href;

const ServicesPage: React.FC = () => {
  const [key, setKey] = useState<string>("oc");

  return (
    <div>
      <NavBar />

      <div className="gig-page">
        <h1 className="page-title">Find Your Perfect Online Gym Service</h1>
        <h2 className="best-coaches">Best Coaches</h2>
        <div className="best-coaches-scrollcontent">
          <HorizontalScrollBar />
        </div>
        <Menu
          className="services-menu"
          defaultSelectedKeys={["oc"]}
          mode="horizontal"
          items={[
            {
              key: "oc",
              label: "Online Coaching",
            },
            {
              key: "pt",

              label: "Personal Training",
            },
          ]}
          onClick={(menuInfo) => {
            const { key } = menuInfo;
            setKey(key);
          }}
        />
        {key == "oc" && (
          <>
            <div className="gig-section">
              <h2 className="section-title">Online Coaching</h2>

              {/* ***********************add 1640 * 924 size images*********************************************/}
              <div className="online-coaching-gigs">
                {" "}
                <GigCard
                  gigId="gig1"
                  gigPhoto={sample1OC}
                  gigTitle="Personalized Online Coaching"
                  sellerName="John Doe"
                  rating={4.9}
                  totalSales={100}
                />
                <GigCard
                  gigId="gig2"
                  gigPhoto={sample1OC}
                  gigTitle="Personalized Online Coaching"
                  sellerName="John Doe"
                  rating={4.9}
                  totalSales={100}
                />
              </div>
            </div>
          </>
        )}
        {key == "pt" && (
          <>
            <div className="gig-section">
              <h2 className="section-title">Personal Training</h2>
              <GigCard
                gigId="gig3"
                gigPhoto={sample1PT}
                gigTitle="1-on-1 Personal Training Sessions"
                sellerName="Jane Smith"
                rating={5.0}
                totalSales={50}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
