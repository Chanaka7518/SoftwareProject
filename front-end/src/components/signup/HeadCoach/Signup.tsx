import React, { useState } from "react";
import "./Style.css";
import { Form, Spin } from "antd";

import Step1 from "./Step1";

import Step2 from "./Step2";
import useSignup from "../../../Hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNumberW, setMobileNumberW] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [disabled, setDisabled] = useState<boolean>(true);

  const { signup, error, isLoading, setIsLoading } = useSignup();

  const handleSubmit = async () => {
    setIsLoading(true);
    await signup(
      firstName,
      lastName,
      pwd,
      gender,
      mobileNumber,
      mobileNumberW,
      email
    );
  };

  // -----------------------qualifications -----------------------

  // const handleAddQualifications = () => {
  //   setQualifications([...qualifications, ""]);
  // };
  // const handleQualificationsChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const updatedQualifications = [...qualifications];
  //   updatedQualifications[index] = event.target.value;
  //   setQualifications(updatedQualifications);
  // };
  // const handleRemoveQualifications = (indexToRemove: number) => {
  //   const updatedQualifications = qualifications.filter(
  //     (qualification, index) => index !== indexToRemove
  //   );
  //   setQualifications(updatedQualifications);
  // };

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
    setGender("");
    setMobileNumber("");
    setMobileNumberW("");
    setPwd("");
    setStep(1);
    navigate("/");
  };

  return (
    <div className="signup-container">
      <Spin
        spinning={isLoading}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Form form={form} onFinish={handleSubmit} className="signup-form">
          {/* Step 1 */}
          {step === 1 && (
            <>
              <Step1
                firstName={firstName}
                lastName={lastName}
                pwd={pwd}
                gender={gender}
                disabled={disabled}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPwd={setPwd}
                setGender={setGender}
                setDisabled={setDisabled}
              />
            </>
          )}
          {/* Step 2 */}
          {step === 2 && (
            <>
              <Step2
                email={email}
                setEmail={setEmail}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                mobileNumberW={mobileNumberW}
                setMobileNumberW={setMobileNumberW}
              />
            </>
          )}

          <div className="button-group">
            {step > 1 && (
              <button
                type="button"
                className="coach-button-2"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {step <= 2 && (
              <button
                type="button"
                className="coach-button-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            {step < 2 && (
              <button
                className="coach-button-1"
                onClick={handleNext}
                disabled={disabled}
              >
                Next
              </button>
            )}
            {step === 2 && (
              <>
                <button type="submit" className="coach-button-1">
                  Submit
                </button>
              </>
            )}

            {/* {step === 5 && (
            <>
             
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
          )} */}
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default Signup;
