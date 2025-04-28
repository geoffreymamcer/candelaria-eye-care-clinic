import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import Card from "./patientCard";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "patientRecords"),
      (snapshot) => {
        const patientData = snapshot.docs.map((doc) => ({
          id: doc.id, // Get the document ID
          ...doc.data(), // Get the rest of the patient data
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
          patientName={patient.fullName} // Assuming you have a fullName field
          patientId={patient.id} // Pass the patient ID
        />
      ))}
    </div>
  );
}

export default PatientList;
