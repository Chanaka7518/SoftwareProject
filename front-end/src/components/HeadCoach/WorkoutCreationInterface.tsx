import { Button, Card } from "antd";
import "./WorkoutCreationInterface.css";
import { useNavigate } from "react-router";

const img1: string = new URL(
  `../../Assets/sample Gig Photos/sample1-oc.png`,
  import.meta.url
).href;
const img2: string = new URL(
  `../../Assets/sample Gig Photos/sample1-pt.png`,
  import.meta.url
).href;

const WorkoutCreationInterface = () => {
  const navigateTo = useNavigate();

  const onClick = (planType: string) => {
    if (planType === "Online Coaching") {
      navigateTo("/dashbord/createplan/onlinecoaching");
    }
    if (planType === "Personal Training") {
      navigateTo("/dashbord/createplan/personaltraining");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {" "}
      <div className="card-workout-creation">
        <div className="gig-image-workout">
          <img
            src={img1}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
        <div className="card-content-workout">
          <h3 className="plan-name-workout">Online Coaching</h3>
          <button
            onClick={() => onClick("Online Coaching")}
            className="create-plan-btn-workout"
          >
            Create Plan
          </button>
        </div>
      </div>
      <div className="card-workout-creation">
        <div className="gig-image-workout">
          {" "}
          <img
            src={img2}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
        <div className="card-content-workout">
          <h3 className="plan-name-workout">Personal Training</h3>
          <button
            onClick={() => onClick("Personal Training")}
            className="create-plan-btn-workout"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCreationInterface;
