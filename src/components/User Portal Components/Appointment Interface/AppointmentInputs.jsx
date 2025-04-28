import React, { useState } from "react";
import { auth, db } from "../../../firebase/firebase";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import Services from "./servicesContainer";

function AppointmentInput() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [selectedService, setSelectedService] = useState(""); // State to hold the selected service
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [timeOfVisit, setTimeOfVisit] = useState("9 AM");
  const [visitStatus, setVisitStatus] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleServiceSelect = (serviceLabel) => {
    setSelectedService(serviceLabel);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;

      try {
        // Fetch user's name from the 'users' collection
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        let firstName = "";
        let lastName = "";

        if (userDocSnap.exists()) {
          firstName = userDocSnap.data().firstName || "";
          lastName = userDocSnap.data().lastName || "";
        }

        const appointmentsCollectionRef = collection(db, "appointments");
        const appointmentData = {
          firstName: firstName, // Include first name
          lastName: lastName, // Include last name
          phoneNumber: phoneNumber,
          emailAddress: emailAddress,
          service: selectedService, // Now this state will hold the selected service
          dateOfVisit: dateOfVisit,
          timeOfVisit: timeOfVisit,
          visitStatus: visitStatus,
          additionalNotes: additionalNotes,
          userId: uid,
          createdAt: new Date(),
        };

        const appointmentDocRef = doc(appointmentsCollectionRef, uid);
        await setDoc(appointmentDocRef, appointmentData);

        console.log("Appointment booked successfully with ID:", uid);
        window.alert("Appointment booked successfully");
        setPhoneNumber("");
        setEmailAddress("");
        setSelectedService(""); // Or reset to a default state if needed
        setDateOfVisit("");
        setTimeOfVisit("9 AM"); // Reset to the default value of the select
        setVisitStatus("");
        setAdditionalNotes("");
      } catch (error) {
        console.error("Error booking appointment:", error);
        window.alert("Error booking appointment");
        // Optionally, show an error message to the user
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointmentInputs">
      <h2 className="bookAppointmentText">BOOK YOUR APPOINTMENT</h2>
      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="phoneNumber">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          required
          className="appointmentField phoneNumber"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      {/* ... (rest of your input fields, ensuring they are controlled components) */}
      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="emailAddress">
          Email Address{" "}
        </label>
        <input
          id="emailAddress"
          className="appointmentField emailAddress"
          placeholder="Enter your phone email"
          required
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>

      <div className="inputsContainer">
        <label htmlFor="">Select Service</label>
        <Services
          onServiceSelect={(service) => setSelectedService(service)}
        />{" "}
        {/* Assuming you pass a callback */}
      </div>

      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="dateOfVisit">
          Preferred Date
        </label>
        <input
          className="dateOfVisit"
          id="dateOfVisit"
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
        />
      </div>

      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="timeOfVisit">
          Preferred Time
        </label>
        <select
          className="timeOfVisit"
          value={timeOfVisit}
          onChange={(e) => setTimeOfVisit(e.target.value)}
        >
          <option value="9 AM">9 A.M.</option>
          <option value="10 AM">10 A.M.</option>
          <option value="11 AM">11 A.M.</option>
          <option value="12 PM">12 P.M.</option>
          <option value="1 PM">1 P.M.</option>
          <option value="2 PM">2 P.M.</option>
          <option value="3 PM">3 P.M.</option>
          <option value="4 PM">4 P.M.</option>
          <option value="5 PM">5 P.M.</option>
        </select>
      </div>

      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="visit">
          Have you visited us before?
        </label>
        <div className="radiosInput">
          <label className="inputLabel radio">
            <input
              className="radio"
              type="radio"
              name="visit"
              value="firstTime"
              checked={visitStatus === "firstTime"}
              onChange={(e) => setVisitStatus(e.target.value)}
            />
            First Time
          </label>
          <label className="inputLabel radio">
            <input
              className="radio"
              type="radio"
              name="visit"
              value="returnee"
              checked={visitStatus === "returnee"}
              onChange={(e) => setVisitStatus(e.target.value)}
            />
            Returnee
          </label>
        </div>
      </div>

      <div className="inputsContainer">
        <label className="inputLabel" htmlFor="additionalNotes">
          Additional Notes (Optional)
        </label>
        <textarea
          rows={4}
          cols={50}
          className="additionalNotes"
          placeholder="Any additional notes or special requests..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="bookAppointmentButton">
        Book Appointment
      </button>
    </form>
  );
}

export default AppointmentInput;
