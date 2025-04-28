import React, { useState } from "react";
import { RealTimeDate, RealTimeTime } from "./date-time";
import CECCLOGO from "../assets/CECC-Logo.png";
import calendar from "../assets/calendar-days-solid.svg";
import notification from "../assets/bell-solid.svg";
import profile from "../assets/circle-user-solid.svg";
import clock from "../assets/clock-solid.svg";
import Input from "./InputField";
import "../styles.css";
import Sidebar from "./sideBarMenu";
import PatientList from "./patient";
import PatientAnalytics from "./patientAnalytics";
import SalesAnalytics from "./salesAnalytics";
import Appointments from "./Appointments";
import Inventory from "./Inventory";
import Feedbacks from "./Feedback";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FloatingButton from "./floating-button";
function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/cecc-admin-login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [activeItem, setActiveItem] = useState("patient");

  const renderContent = () => {
    switch (activeItem) {
      case "patient":
        return <PatientList />;
      case "patient-analytics":
        return <PatientAnalytics />;
      case "sales-analytics":
        return <SalesAnalytics />;
      case "appointments":
        return <Appointments />;
      case "inventory":
        return <Inventory />;
      case "feedbacks":
        return <Feedbacks />;
      default:
        return <h2>Welcome</h2>;
    }
  };

  return (
    <div className="adminDashboardContainer">
      <header className="dashBoardHeader">
        <div className="logoContainer">
          <img className="CECClogo icon" src={CECCLOGO} />
        </div>
        <div className="dateTimeContainer">
          <div className="dateContainer">
            <img className="icon calendar" src={calendar} />
            <RealTimeDate />
          </div>
          <div className="timeContainer">
            <img className="icon clock" src={clock} />
            <RealTimeTime />
          </div>
        </div>
        <div className="searchBar">
          <Input className="searchBarInput" placeholder="Search" />
        </div>
        <div className="profile-notification">
          <img className="icon notification" src={notification} />
          <img className="icon profile" src={profile} />
          <button className="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="mainDashboard">
        <div className="dashboardSideBar">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
        </div>
        <div className="dashboardMainContent">
          {renderContent()}
          <FloatingButton />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
