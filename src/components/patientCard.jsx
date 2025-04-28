// patientCard.jsx
import React, { useState } from "react";
import "../styles.css";
import profilePicture from "../assets/profile-pic-place-holder.jpg";
import PatientInformation from "./patient-info";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function Card(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null); // State to hold full patient data

  const togglePopup = async () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen && props.patientId) {
      // Fetch patient details from Firestore using the ID
      const patientDocRef = doc(db, "patientRecords", props.patientId);
      const docSnap = await getDoc(patientDocRef);

      if (docSnap.exists()) {
        setPatientDetails(docSnap.data());
      } else {
        console.log("No such document!");
        setPatientDetails(null);
      }
    } else {
      setPatientDetails(null); // Clear details when closing
    }
  };

  return (
    <div className="patientRecordCard">
      <img
        src={profilePicture}
        alt="Patient Profile"
        className="patientProfilePicture"
      />
      <p className="patientName">{props.patientName}</p>
      <button className="viewDetailsButton" onClick={togglePopup}>
        View More
      </button>

      {/* Popup conditionally rendered and pass patientDetails */}
      {isPopupOpen && patientDetails && (
        <div className="patient-info-popup">
          <div className="patient-information-container">
            <PatientInformation {...patientDetails} onClick={togglePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
