// patient-info.jsx
import React, { useState } from "react";
import "../styles.css";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const PatientInformation = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: props.fullName || "",
    dob: props.dob || "",
    age: props.age || "",
    address: props.address || "",
    contact: props.contact || "",
    occupation: props.occupation || "",
    civilStatus: props.civilStatus || "",
    referralBy: props.referralBy || "",
    gender: props.gender || "",
    ageCategory: props.ageCategory || "",
    ocularHistory: props.ocularHistory || "",
    healthHistory: props.healthHistory || "",
    familyMedicalHistory: props.familyMedicalHistory || "",
    medications: props.medications || "",
    allergies: props.allergies || "",
    occupationalHistory: props.occupationalHistory || "",
    digitalHistory: props.digitalHistory || "",
    chiefComplaint: props.chiefComplaint || "",
    associatedComplaint: props.associatedComplaint || "",
    diagnosis: props.diagnosis || "",
    treatmentPlan: props.treatmentPlan || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      fullName: props.fullName || "",
      dob: props.dob || "",
      age: props.age || "",
      address: props.address || "",
      contact: props.contact || "",
      occupation: props.occupation || "",
      civilStatus: props.civilStatus || "",
      referralBy: props.referralBy || "",
      gender: props.gender || "",
      ageCategory: props.ageCategory || "",
      ocularHistory: props.ocularHistory || "",
      healthHistory: props.healthHistory || "",
      familyMedicalHistory: props.familyMedicalHistory || "",
      medications: props.medications || "",
      allergies: props.allergies || "",
      occupationalHistory: props.occupationalHistory || "",
      digitalHistory: props.digitalHistory || "",
      chiefComplaint: props.chiefComplaint || "",
      associatedComplaint: props.associatedComplaint || "",
      diagnosis: props.diagnosis || "",
      treatmentPlan: props.treatmentPlan || "",
    });
  };

  const handleSave = async () => {
    try {
      const patientRef = doc(db, "patientRecords", props.patientId);
      await updateDoc(patientRef, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient record");
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm("Are you sure you want to delete this patient record?")
    ) {
      try {
        await deleteDoc(doc(db, "patientRecords", props.patientId));
        props.onClick(); // Close the popup after deletion
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Failed to delete patient record");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      fullName: props.fullName || "",
      dob: props.dob || "",
      age: props.age || "",
      address: props.address || "",
      contact: props.contact || "",
      occupation: props.occupation || "",
      civilStatus: props.civilStatus || "",
      referralBy: props.referralBy || "",
      gender: props.gender || "",
      ageCategory: props.ageCategory || "",
      ocularHistory: props.ocularHistory || "",
      healthHistory: props.healthHistory || "",
      familyMedicalHistory: props.familyMedicalHistory || "",
      medications: props.medications || "",
      allergies: props.allergies || "",
      occupationalHistory: props.occupationalHistory || "",
      digitalHistory: props.digitalHistory || "",
      chiefComplaint: props.chiefComplaint || "",
      associatedComplaint: props.associatedComplaint || "",
      diagnosis: props.diagnosis || "",
      treatmentPlan: props.treatmentPlan || "",
    });
  };

  const personalInfo = [
    { label: "Full Name", name: "fullName", value: formData.fullName },
    { label: "Date of Birth", name: "dob", value: formData.dob },
    { label: "Age", name: "age", value: formData.age },
    { label: "Address", name: "address", value: formData.address },
    { label: "Contact", name: "contact", value: formData.contact },
    { label: "Occupation", name: "occupation", value: formData.occupation },
    { label: "Civil Status", name: "civilStatus", value: formData.civilStatus },
    { label: "Referral By", name: "referralBy", value: formData.referralBy },
    { label: "Gender", name: "gender", value: formData.gender },
    { label: "Age Category", name: "ageCategory", value: formData.ageCategory },
  ];

  const medicalHistory = [
    {
      label: "Ocular History",
      name: "ocularHistory",
      value: formData.ocularHistory,
    },
    {
      label: "Health History",
      name: "healthHistory",
      value: formData.healthHistory,
    },
    {
      label: "Family Medical History",
      name: "familyMedicalHistory",
      value: formData.familyMedicalHistory,
    },
    { label: "Medications", name: "medications", value: formData.medications },
    { label: "Allergies", name: "allergies", value: formData.allergies },
    {
      label: "Occupational History",
      name: "occupationalHistory",
      value: formData.occupationalHistory,
    },
    {
      label: "Digital History (Screen Time)",
      name: "digitalHistory",
      value: formData.digitalHistory,
    },
  ];

  const visitDetails = [
    {
      label: "Chief Complaint",
      name: "chiefComplaint",
      value: formData.chiefComplaint,
    },
    {
      label: "Associated Complaint",
      name: "associatedComplaint",
      value: formData.associatedComplaint,
    },
    { label: "Diagnosis", name: "diagnosis", value: formData.diagnosis },
    {
      label: "Treatment Plan and Management",
      name: "treatmentPlan",
      value: formData.treatmentPlan,
    },
  ];

  const renderSection = (title, data) => (
    <>
      <h2 className="informationCategory">{title}</h2>
      {data.map(({ label, name, value }, index) => (
        <div className="detail-row" key={index}>
          <span className="detail-label">{label}:</span>
          <input
            className="inputField"
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
            disabled={!isEditing}
            size={value ? value.length : 20}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="patient-details">
      {renderSection("Personal Information", personalInfo)}
      {renderSection("Medical History", medicalHistory)}
      {renderSection("Visit-Specific Details", visitDetails)}

      <div className="patient-info-actions">
        {!isEditing ? (
          <>
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="patient-information-close-button"
              onClick={props.onClick}
            >
              Close
            </button>
          </>
        ) : (
          <>
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientInformation;
