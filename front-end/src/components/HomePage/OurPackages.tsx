import Package from "../HeadCoach/Package";
import PackageCard from "./PackageCard";

const OurPackages = () => {
  // descriptions
  const platinum: string = `Get the ultimate personalized experience with our Platinum Package, featuring weekly check-ins and a one-hour response guarantee.`;
  const gold: string =
    "Stay on track with our Gold Package, offering bi-weekly check-ins and a two-hour response time.";
  const silver: string =
    "Achieve your fitness goals at your own pace with our Silver Package, which includes check-ins every three weeks and a three-hour response time.";
  const bronze: string =
    "Lay a solid foundation for your fitness journey with our Bronze Package, featuring check-ins every four weeks.";

  // photos

  const diamondIcon: string = new URL(
    `../../Assets/diamond.png`,
    import.meta.url
  ).href;
  const goldIcon: string = new URL(`../../Assets/gold.png`, import.meta.url)
    .href;
  const silverIcon: string = new URL(`../../Assets/silver.png`, import.meta.url)
    .href;
  const bronzeIcon: string = new URL(
    `../../Assets/bronze-medal.png`,
    import.meta.url
  ).href;

  return (
    <div>
      <h2 className="aboutTitle">OUR PACKAGES</h2>
      <div className="mainpkgContaner">
        <div className="cardContainer">
          <PackageCard
            photo={diamondIcon}
            title="Platinum Package"
            description={platinum}
          />
          <PackageCard
            photo={goldIcon}
            title="Gold Package"
            description={gold}
          />
          <PackageCard
            photo={silverIcon}
            title="Silver Package"
            description={silver}
          />
          <PackageCard
            photo={bronzeIcon}
            title="Bronze Package"
            description={bronze}
          />
        </div>
      </div>
    </div>
  );
};

export default OurPackages;
