import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Card from "./patientCard";
import "../styles.css";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "patientRecords"),
      (snapshot) => {
        const patientData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientData);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="patientList">
      {patients.map((patient) => (
        <Card
          key={patient.id}
          patientName={patient.fullName}
          patientId={patient.id}
          email={patient.email}
          phoneNumber={patient.phoneNumber}
        />
      ))}
    </div>
  );
}

export default PatientList;
