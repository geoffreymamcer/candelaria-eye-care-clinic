import React, { useState } from "react";
import Input from "./InputField";
import myImage from "../assets/candelariaClinicCover.png";
import icon from "../assets/circle-user-solid.svg";
import "../styles.css";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"; // or wherever you initialize Firestore

function AdminLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.role === "admin") {
          navigate("/cecc-admin-dashboard");
        } else {
          setError("Access denied: not an admin account.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="adminLogInDiv">
      <div className="logInContainer">
        <div className="child logo">
          <img className="logoImage" src={myImage} alt="Clinic Logo"></img>
        </div>
        <form className="child form" onSubmit={handleSubmit}>
          <img className="adminLoginUserLogo" src={icon} alt="User Icon" />
          <h3 className="loginText">Admin Account</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Input
            type="email" // Use email type
            className="adminInput username"
            placeholder="Email" // Change to Email
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            className="adminInput password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="submit"
            className="adminInput loginButton"
            value="Log In"
          />
        </form>
      </div>
    </div>
  );
}

export default AdminLogIn;
