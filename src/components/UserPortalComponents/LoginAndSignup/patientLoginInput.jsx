import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../../InputField";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // your initialized Firestore
import "./patientPortalLogin.css";

function PatientLogInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 🔎 Get user's role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "patient") {
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/user-dashboard");
        } else {
          setError("Access denied: this is not a patient account.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);
    }
  };
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <Input
        type="email" // Use type="email" for better input validation
        placeholder="Email"
        className="loginCredential patientLoginUsername"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        className="loginCredential patientLoginPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="submit"
        value="Log In"
        className="loginCredential loginButton"
      />

      <a href="" className="forgot-password-link"></a>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default PatientLogInForm;
