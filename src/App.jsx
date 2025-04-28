import React from "react";
import AdminLogIn from "./components/adminLogInUI";
import Dashboard from "./components/adminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientLogInUI from "./components/User Portal Components/Login and Signup/patientLogIn";

import PatientSignUp from "./components/User Portal Components/Login and Signup/patientSignUp";
import DashboardUI from "./components/User Portal Components/Patient Dashboard/patientDashboardUI";
import AppointmentInterface from "./components/User Portal Components/Appointment Interface/AppointmentInterface";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cecc-admin-login" element={<AdminLogIn />} />
        <Route path="/" element={<PatientLogInUI />} />
        <Route path="/patient-signup" element={<PatientSignUp />} />
        <Route path="/user-dashboard" element={<DashboardUI />} />
        <Route path="/appointment" element={<AppointmentInterface />} />

        <Route
          path="/cecc-admin-dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
