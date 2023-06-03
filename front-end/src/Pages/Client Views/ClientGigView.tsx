import React, { useState, createContext } from "react";
import "./style.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Carousel, Descriptions, Divider, Menu, Rate } from "antd";
import { GoCheck } from "react-icons/go";
import { Route, Routes, useNavigate } from "react-router";

import BuyModal from "../Buyservice/BuyModal";

const profilePicture: string = new URL(
  `../../Assets/profile.png`,
  import.meta.url
).href;

interface props {
  gigId?: string;
}

interface reviewProp {
  review: string;
  clientName: string;
  rate: number;
}

interface gigProps {
  gigId: string;
  gigPhoto: string;
  gigTitle: string;
  sellerName: string;
  sellerId: string;
  rating: number;
  totalSales: number;
  ongoingOrders: number;
  pkgFeatures: string[];
  gigDescription: string;
  category: string; //online coaching or personal training,
  reviews: reviewProp[];
  price: {
    onlineCoaching: {
      platinum: number;
      gold: number;
      silver: number;
      bronze: number;
    };
    personalTraining: {
      platinum: number;
      gold: number;
      silver: number;
      bronze: number;
    };
  };
}

const sample1OC: string = new URL(
  `../../Assets/sample Gig Photos/sample1-oc.png`,
  import.meta.url
).href;
const sample1PT: string = new URL(
  `../../Assets/sample Gig Photos/sample1-pt.png`,
  import.meta.url
).href;

const ClientGigView: React.FC<props> = ({ gigId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // using this gig id, take gig data from the database
  const gigData: gigProps = {
    gigId: "0001",
    gigPhoto: sample1OC,
    gigTitle: "Personalized Online Coaching",
    sellerName: "John Doe",
    rating: 5,
    totalSales: 100,
    ongoingOrders: 3,
    pkgFeatures: [
      " Package Customization",
      "Additional Resources",
      "Community Support",
      "Video Workouts",
      "Communication and Support",
      "Progress Tracking",
      "Nutritional Guidanc",
    ],
    gigDescription: "ABC",
    category: "Personal Training",
    reviews: [
      {
        clientName: "David willey",
        review:
          "Working with this personal trainer has been a game changer! Their dedication and expertise have helped me achieve my fitness goals faster than I ever imagined.",
        rate: 5,
      },
      {
        clientName: "David Miller",
        review:
          "I highly recommend this personal trainer! They are not only knowledgeable and skilled, but also incredibly motivating and supportive. Every session is challenging and fun!",
        rate: 4,
      },
      {
        clientName: "Laim Livingston",
        review:
          "The results speak for themselves! Thanks to this personal trainer, I am now stronger, fitter, and more confident in my own skin. I can't thank them enough for their guidance and encouragement.",
        rate: 4,
      },
      {
        clientName: "Eion Morgan",
        review:
          "I've had personal trainers before, but none compare to this seller! They truly care about their clients and go above and beyond to tailor workouts to my needs and preferences. I always leave feeling energized and accomplished.",
        rate: 5,
      },
    ],
    sellerId: "ID1",
    price: {
      onlineCoaching: {
        platinum: 30000,
        gold: 25000,
        silver: 20000,
        bronze: 10000,
      },
      personalTraining: {
        platinum: 40000,
        gold: 35000,
        silver: 15000,
        bronze: 5000,
      },
    },
  };

  // to open the modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>("overview");
  console.log(gigData.category);
  return (
    <div>
      <NavBar />
      <Menu
        className="second-menu"
        mode="horizontal"
        items={[
          {
            label: "overview",
            key: "overview",
          },
          {
            label: "About seller",
            key: "about seller",
          },
          {
            label: "Reviews",
            key: "reviews",
          },
        ]}
        onClick={(menuInfo) => {
          const { key } = menuInfo;
          setMenu(key);
        }}
        defaultSelectedKeys={["overview"]}
      ></Menu>
      <div className="client-gig-view">
        {/* lEFT SIDE */}

        <div className="left-side">
          {/* If menu is overview */}
          {menu === "overview" && (
            <>
              {" "}
              <h2 className="gig-title">{gigData.gigTitle}</h2>
              <div className="rate-name-orders-div">
                <div className="gig-image">
                  <img src={gigData.gigPhoto} alt={gigData.gigTitle} />
                </div>
                <div className="main-titles">
                  <h2>
                    <span style={{ color: "black", padding: "0px" }}>
                      {`${gigData.sellerName} `}{" "}
                    </span>{" "}
                    |
                    <Rate disabled allowHalf defaultValue={gigData.rating} />
                    <span
                      style={{ color: "#feff5t" }}
                    >{`${gigData.rating}`}</span>
                    ({gigData.totalSales})
                  </h2>
                  <h3 className="ongoing">
                    {gigData.ongoingOrders} plans are ongoing
                  </h3>
                </div>
                <div className="about-gig">
                  <h2>About this gig</h2>
                  <div className="description">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Alias ipsam reiciendis fuga sed dicta maiores voluptas
                      delectus fugit exercitationem tempora aliquam nulla
                      dignissimos animi, iure molestias officia unde recusandae
                      reprehenderit! Blanditiis necessitatibus quos doloribus
                      possimus, optio ad voluptatibus accusamus perferendis
                      enim! Exercitationem enim, recusandae, voluptatem quaerat
                      quo eum labore deleniti hic, sit dolore odit incidunt
                      nesciunt culpa vitae in nobis. Accusantium mollitia sint,
                      unde impedit voluptatibus repellat voluptates alias
                      voluptas ipsum reiciendis hic tempora. Quas et repellendus
                      suscipit officiis, laborum dolorem, ratione impedit ipsa
                      voluptatem minus harum, necessitatibus quam autem!
                    </p>{" "}
                  </div>
                </div>

                <div className="sellers-ideas-of-gig">
                  <h2>What people loved about this seller?</h2>
                  <div className="sellers-reviews">
                    {" "}
                    <Carousel style={{ width: "600px" }} autoplay>
                      {gigData.reviews.map((item) => (
                        <div className="review-section">
                          <p className="review-tag">{item.review}</p>
                          <p className="client-name">-{item.clientName}</p>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* if menu is seller section*/}
          {menu === "about seller" && (
            <>
              <h2>About the Coach</h2>
              <div className="seller-main-details">
                <div className="profile-picture">
                  <img src={profilePicture} alt="" />
                </div>
                <div className="details">
                  <h2 className="seller-name">{gigData.sellerName}</h2>
                  <span>
                    <Rate disabled defaultValue={gigData.rating} />
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                        color: "#deb40c",
                      }}
                    >
                      -{gigData.rating}
                    </span>
                  </span>
                  <div className="contact-btn-container">
                    <button className="contact-btn">Contact me</button>
                  </div>
                </div>
              </div>
              <div className="seller-information">
                {/* Here we do not add contact information for security purpose */}
                <Descriptions
                  layout="vertical"
                  size="small"
                  column={2}
                  style={{ padding: "30px" }}
                >
                  <Descriptions.Item
                    labelStyle={{ fontWeight: "Bold" }}
                    label="Seller Name"
                  >
                    {gigData.sellerName}
                  </Descriptions.Item>
                  <Descriptions.Item
                    labelStyle={{ fontWeight: "Bold" }}
                    label="Age"
                  >
                    46
                  </Descriptions.Item>
                  <Descriptions.Item
                    labelStyle={{ fontWeight: "Bold" }}
                    label="Member since"
                  >
                    2023-01-05
                  </Descriptions.Item>
                  <Descriptions.Item
                    labelStyle={{ fontWeight: "Bold" }}
                    label="Total sales"
                  >
                    {gigData.totalSales}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Ongoing Workouts"
                    labelStyle={{ fontWeight: "Bold" }}
                  >
                    {gigData.ongoingOrders}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Seller reviews"
                    labelStyle={{ fontWeight: "Bold" }}
                  >
                    {gigData.reviews.length}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label="Description"
                    labelStyle={{ fontWeight: "Bold" }}
                    style={{ textAlign: "justify" }}
                    span={2}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                    totam doloremque nemo, est enim, aut fugiat in quae
                    consequuntur inventore quod dolor molestias possimus
                    placeat, at eos voluptatem. Officia, adipisci? Veritatis
                    quibusdam illum sint magnam eveniet ex adipisci delectus
                    reprehenderit dolor fugit velit ea earum animi, dolorum
                    beatae aut perspiciatis quia, aliquam cumque nihil. Quam
                    cupiditate quia veniam dolorem voluptates! Architecto
                    blanditiis aliquam animi quae eveniet quia suscipit
                    doloribus velit doloremque sunt natus dolores tempora, alias
                    nam nobis ipsam exercitationem, consectetur ipsa
                    voluptatibus itaque ab quo nesciunt. Repellat, doloremque
                    id? Eius molestias delectus quasi ut ea neque quod rem,
                    officia expedita iusto quae! Doloribus laboriosam obcaecati
                    provident suscipit nisi voluptatum est culpa odit reiciendis
                    ducimus. Iusto sapiente ipsam ullam mollitia! Necessitatibus
                    nobis, quasi exercitationem nulla illo error iure. Repellat
                    aliquam placeat voluptates magnam consequatur! In quidem,
                    voluptatum fuga accusantium eos, perferendis maxime
                    consectetur excepturi animi accusamus illum suscipit. Eaque,
                    consequatur.
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </>
          )}
          {/* if menu is reviews */}
          {menu == "reviews" && (
            <>
              <div className="review-container">
                <h2>Seller Reviews</h2>
                {gigData.reviews.length > 0 ? (
                  gigData.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <div className="review-rating">
                        <Rate disabled defaultValue={review.rate} />{" "}
                        {review.rate}
                      </div>
                      <div className="review-text">{review.review}</div>
                      <div className="review-name">- {review.clientName}</div>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            </>
          )}
          {/* Buy section */}
        </div>
        {/* ################## RIGHT SIDE ################## */}
        <div className="right-side">
          <div className="pkg-details">
            <h2>Package Features</h2>
            <ul>
              {gigData.pkgFeatures.map((item: string) => (
                <li>
                  <GoCheck className="check-mark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {" "}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="continue-btn"
              >
                Continue
              </button>
            </div>
          </div>
          <div className="contact-me">
            <button className="contact-me-btn">Contact me</button>
          </div>
        </div>

        {/* Send data to the buying process */}
      </div>
      <BuyModal
        isOpen={isOpen}
        gigId={gigData.gigId}
        gigTitle={gigData.gigTitle}
        sellerId={gigData.sellerId}
        sellerName={gigData.sellerName}
        category={gigData.category}
        price={gigData.price}
        setIsOpen={setIsOpen}
      />
      <Footer />
    </div>
  );
};

export default ClientGigView;
