import React, { useState } from "react";
import "./Style.css";

function Test() {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [qualifications, setQualifications] = useState([""]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Qualifications:", qualifications);
  };
  const handleAddQualifications = () => {
    setQualifications([...qualifications, ""]);
  };
  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = event.target.value;
    setQualifications(updatedQualifications);
  };
  const handleRemoveQualifications = (indexToRemove: number) => {
    const updatedQualifications = qualifications.filter(
      (qualification, index) => index !== indexToRemove
    );
    setQualifications(updatedQualifications);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setStep(1);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        {step === 1 && (
          <>
            <h2>Step 1: Personal Information</h2>
            <input
              type="text"
              placeholder="First Name"
              className="input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </>
        )}

        {step === 2 && (
          <>
            <h2>Step 2: Contact Information</h2>
            <input
              type="email"
              placeholder="Email Address"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </>
        )}

        <div className="button-group">
          {step > 1 && (
            <button type="button" className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
          {step < 2 && (
            <button type="button" className="next-button" onClick={handleNext}>
              Next
            </button>
          )}
          {step === 2 && (
            <>
              <button type="submit" className="next-button">
                Submit
              </button>
              <h2>Step 3: Qualifications</h2>
              {qualifications.map((qualification, index) => (
                <>
                  <input
                    type="text"
                    placeholder="Enter a qualification"
                    className="input"
                    value={qualification}
                    onChange={(event) =>
                      handleQualificationsChange(event, index)
                    }
                    key={index}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveQualifications(index)}
                  >
                    Remove
                  </button>
                </>
              ))}
              <button type="button" onClick={handleAddQualifications}>
                Add New
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Test;
