import React from "react";

import "./HomepageBody.css";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import { useAuthContext } from "../../Hooks/useAuthContext";
import Unauthorized from "../../components/Errors/403";
import HeroBanner from "../../components/HomePage/HeroBanner";
import AboutUs from "../../components/HomePage/AboutUs";
import Services from "../../components/HomePage/Services";
import OurPackages from "../../components/HomePage/OurPackages";
import ContactUs from "../../components/HomePage/ContactUs";
import Aim from "../../components/HomePage/Aim";
import Testimonials from "../../components/HomePage/Testimonials";

const HomepageBody = () => {
  const { userData } = useAuthContext();
  const userRole: string = userData?.userRole;

  return (
    <>
      {userRole !== "Admin" && (
        <div className="container">
          <NavBar />
          <HeroBanner />

          <AboutUs />
          <Aim />
          <Services />
          <OurPackages />
          <Testimonials />
          <ContactUs />
          <Footer />
        </div>
      )}

      {userRole === "Admin" && (
        <>
          <Unauthorized />
        </>
      )}
    </>
  );
};

export default HomepageBody;
