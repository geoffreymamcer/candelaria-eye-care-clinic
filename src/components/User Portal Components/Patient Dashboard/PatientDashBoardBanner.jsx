import React, { useEffect, useState } from "react";
import "./PortalDashboard.css";

function PatientBanner({ name }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = (hour) => {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greeting = getGreeting(time.getHours());

  return (
    <div className="PortalBanner">
      <h1>
        {greeting}, {name}!
      </h1>
      <p>Your Eye Health Journey Matters to Us</p>
      <p className="lastLogin">Last Log in:{time.toLocaleDateString()}</p>
    </div>
  );
}

export default PatientBanner;
