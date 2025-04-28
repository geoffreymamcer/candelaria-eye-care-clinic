// patient-info.jsx
import React from "react";
import "../styles.css";

const PatientInformation = (props) => {
  const personalInfo = [
    { label: "Full Name", value: props.fullName },
    { label: "Date of Birth", value: props.dob },
    { label: "Age", value: props.age },
    { label: "Address", value: props.address },
    { label: "Contact", value: props.contact },
    { label: "Occupation", value: props.occupation },
    { label: "Civil Status", value: props.civilStatus },
    { label: "Referral By", value: props.referralBy },
    { label: "Gender", value: props.gender },
    { label: "Age Category", value: props.ageCategory },
  ];

  // same idea for medicalHistory and visitDetails

  const medicalHistory = [
    { label: "Ocular History", value: props.ocularHistory },
    { label: "Health History", value: props.healthHistory },
    { label: "Family Medical History", value: props.familyMedicalHistory },
    { label: "Medications", value: props.medications },
    { label: "Allergies", value: props.allergies },
    { label: "Occupational History", value: props.occupationalHistory },
    { label: "Digital History (Screen Time)", value: props.digitalHistory },
  ];

  const visitDetails = [
    { label: "Chief Complaint", value: props.chiefComplaint },
    { label: "Associated Complaint", value: props.associatedComplaint },
    { label: "Diagnosis", value: props.diagnosis },
    { label: "Treatment Plan and Management", value: props.treatmentPlan },
  ];

  const renderSection = (title, data) => (
    <>
      <h2 className="informationCategory">{title}</h2>
      {data.map(({ label, value }, index) => (
        <div className="detail-row" key={index}>
          <span className="detail-label">{label}:</span>
          <input
            className="inputField"
            type="text"
            value={value}
            size={value.length}
            disabled
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

      <button
        className="patient-information-close-button"
        onClick={props.onClick}
      >
        Close
      </button>
    </div>
  );
};

export default PatientInformation;
