import React from "react";
import AdminLogIn from "./components/adminLogInUI";
import Dashboard from "./components/adminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientLogInUI from "./components/UserPortalComponents/Login and Signup/patientLogIn";

import PatientSignUp from "./components/UserPortalComponents/Login and Signup/patientSignUp";
import DashboardUI from "./components/UserPortalComponents/PatientDashboard/patientDashboardUI";

import AppointmentInterface from "./components/UserPortalComponents/Appointment Interface/AppointmentInterface";

import ColorVisionTestUI from "./components/UserPortalComponents/ColorVisionTest/ColorVisionTestUI/ColorVisionTestUI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cecc-admin-login" element={<AdminLogIn />} />
        <Route path="/" element={<PatientLogInUI />} />
        <Route path="/patient-signup" element={<PatientSignUp />} />

        {/* Nested routes inside user-dashboard */}
        <Route path="/user-dashboard" element={<DashboardUI />}>
          <Route path="appointment" element={<AppointmentInterface />} />
        </Route>

        <Route
          path="/user-dashboard/color-vision-test"
          element={<ColorVisionTestUI />}
        />

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
