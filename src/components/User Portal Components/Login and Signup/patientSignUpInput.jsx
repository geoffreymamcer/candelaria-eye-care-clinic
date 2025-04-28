import React, { useState, useEffect } from "react";
import Input from "../../InputField";

import { auth } from "../../../firebase/firebase";
import "./patientPortalLogin.css";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false); // To prevent double submissions
  const [firstName, setFirstname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const db = getFirestore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (isCreatingUser) return; // Prevent multiple submissions
    setIsCreatingUser(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsCreatingUser(false);
      return;
    }

    console.log("Attempting to create user with email:", email);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user.uid);

      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser && authUser.uid === user.uid) {
          unsubscribe(); // Stop listening

          console.log("Auth state confirmed for user:", authUser.uid);
          try {
            await setDoc(doc(db, "users", authUser.uid), {
              firstName: firstName,
              middleName: middleName,
              lastName: lastName,
              username: username,
              email: email,
              role: "patient",
            });
            console.log("User data written to Firestore");
            alert("Account Created Successfully");
            navigate("/");
          } catch (firestoreError) {
            console.error("Error writing to Firestore:", firestoreError);
            setError("Failed to save user data.");
          } finally {
            setIsCreatingUser(false);
          }
        } else if (authUser) {
          console.log("Auth state changed to a different user:", authUser.uid);
          setIsCreatingUser(false);
        } else {
          console.log("No user is currently authenticated.");
          setIsCreatingUser(false);
        }
      });
    } catch (authError) {
      console.error("Error creating user:", authError);
      setError(authError.message);
      setIsCreatingUser(false);
    }
  };

  return (
    <form className="signUpForm" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="First Name"
        className="loginCredential patientLoginUsername"
        value={firstName}
        onChange={(e) => setFirstname(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Middle Name"
        className="loginCredential patientLoginUsername"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Last Name"
        className="loginCredential patientLoginUsername"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Username"
        className="loginCredential patientLoginUsername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="email"
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
        type="password"
        placeholder="Confirm Password"
        className="loginCredential patientLoginPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Input
        type="submit"
        value="Sign Up"
        className="loginCredential signupButton"
        disabled={isCreatingUser}
      />

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default SignUpForm;
