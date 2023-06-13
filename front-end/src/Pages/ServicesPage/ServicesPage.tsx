import React, { useState, useEffect } from "react";
import GigCard from "./GigCard";
import "./Styles.css";
import NavBar from "../../components/NavBar";
import { Menu, message } from "antd";
import HorizontalScrollBar from "../../components/HorizontalScrollBar";
import Footer from "../../components/Footer";
import newRequest from "../../Utils/newRequest";

const sample1OC: string = new URL(
  `../../Assets/sample Gig Photos/sample1-oc.png`,
  import.meta.url
).href;
const sample1PT: string = new URL(
  `../../Assets/sample Gig Photos/sample1-pt.png`,
  import.meta.url
).href;
interface gigs {
  id: string;
  Title: string;
  category: string;
  des: string;
  gigPhoto: string;
  ongoingOrders: number;
  price: { platinum: number; gold: number; silver: number; bronze: number };
  sellerId: string;
  starNumber: number;
  totalRating: number;
  totalSales: number;
}
const ServicesPage: React.FC = () => {
  const [gigs, setGigs] = useState<gigs[]>();
  const [key, setKey] = useState<string>("Online Coaching");
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await newRequest.get("/gigs", {
          params: {
            category: key,
          },
        });
        setGigs(res.data);
        console.log(gigs);
      } catch (error: any) {
        message.error(error.message);
      }
    };
    fetchGig();
  }, [key]);

  return (
    <div>
      <NavBar />

      <div className="gig-page">
        <h1 className="page-title">Find Your Perfect Online Gym Service</h1>

        <Menu
          className="services-menu"
          defaultSelectedKeys={["Online Coaching"]}
          mode="horizontal"
          items={[
            {
              key: "Online Coaching",
              label: "Online Coaching",
            },
            {
              key: "Personal Training",

              label: "Personal Training",
            },
          ]}
          onClick={(menuInfo) => {
            const { key } = menuInfo;
            setKey(key);
          }}
        />
        {key == "Online Coaching" && (
          <>
            <div className="gig-section">
              <h2 className="section-title">Online Coaching</h2>

              {/* ***********************add 1640 * 924 size images*********************************************/}
              {gigs &&
                gigs.map((gig, index) => (
                  <div className="online-coaching-gigs">
                    {" "}
                    <GigCard
                      gigId={gig.id}
                      gigPhoto={gig.gigPhoto}
                      gigTitle={gig.Title}
                      sellerId={gig.id}
                      rating={gig.starNumber}
                      totalSales={gig.totalSales}
                    />{" "}
                  </div>
                ))}
            </div>
          </>
        )}
        {key == "Personal Training" && (
          <>
            <div className="gig-section">
              <h2 className="section-title">Personal Training</h2>
              {gigs &&
                gigs.map((gig, index) => (
                  <div className="online-coaching-gigs">
                    {" "}
                    <GigCard
                      gigId={gig.id}
                      gigPhoto={gig.gigPhoto}
                      gigTitle={gig.Title}
                      sellerId={gig.id}
                      rating={gig.starNumber}
                      totalSales={gig.totalSales}
                    />{" "}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
