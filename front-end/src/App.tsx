import { Route, Routes } from "react-router-dom";
import HeadCoachSignUp from "./components/signup/HeadCoachSignUp";
import HomepageBody from "./Pages/HomePage/HomepageBody";
import Login from "./components/login/Login";
import LoginTest from "./components/Logins/Login";
import ForgetPwd from "./components/login/ForgetPwd";
import CreateNewPassword from "./components/login/CreateNewPassword";
import Admin from "./Pages/Admin/Admin";
import ClientSignup from "./components/signup/Client/ClientSignup";
import HeadCoachProfile from "./Pages/HeadCoach/HeadCoachProfile";
import UserDashboard from "./Pages/UserDashboard";
import Success from "./components/Results/Success";
import Workouts from "./components/HeadCoach/Workouts";
import { Coaching } from "./components/Coaching";
import Color from "./Color";
import ClientList from "./components/HeadCoach/ClientList";
import MySales from "./components/HeadCoach/MySales";
import Form1 from "./components/signup/HeadCoach/Form1";
import SalesList from "./components/HeadCoach/SalesList";
import MyTeam from "./components/HeadCoach/MyTeam";
import ServicesPage from "./Pages/ServicesPage/ServicesPage";
import ClientGigView from "./Pages/Client Views/ClientGigView";
import Step1 from "./components/signup/HeadCoach/Step1";
import Signup from "./components/signup/HeadCoach/Signup";
// import Test from "./components/signup/HeadCoach/Test";
import Test from "./Pages/Test";



const App: React.FC = () => {
  return (
    <div className="App">
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomepageBody />} />
          <Route path="/generate" element={<UserDashboard />} />
          <Route path="/signupHeadCoach/:token" element={<HeadCoachSignUp />} />
          <Route path="/signup" element={<ClientSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpwd" element={<ForgetPwd />} />{" "}
          <Route
            path="/newPassword/:id/:token"
            element={<CreateNewPassword />}
          />
          <Route path="/alf-admin" element={<Admin />} />
          <Route path="/headcoachprofile" element={<HeadCoachProfile />} />
          <Route
            path="/adminProfile"
            element={<div>Hi this is admin profile</div>}
          />
          <Route
            path="/clientProfile"
            element={<div>Hi this is client profile</div>}
          />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/success" element={<Success />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:name/:gigId" element={<ClientGigView />} />
          <Route path="/color" element={<Color />} />
          <Route path="/myclients" element={<ClientList />} />
          <Route path="/mysales" element={<MySales />} />
          <Route path="/mysales/saleslist" element={<SalesList />} />
          <Route path="/myteam" element={<MyTeam />} />
          
          
          

          {/* test */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
