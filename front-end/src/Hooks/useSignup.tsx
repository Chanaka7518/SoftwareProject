import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useParams } from "react-router";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import newRequest from "../Utils/newRequest";

interface SignupResult {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: any;
}

const useSignup = () => {
  const navigate = useNavigate();
  const { tokenByAlphalee } = useParams(); // this is extract from params to send request by identifying user
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    // input parameters
    fName: string,
    lastName: string,
    password: string,
    gender: string,
    mobileNumber: string,
    whatsapp: string,
    email: string
  ) => {
    // setIsLoading(true);
    setError(null);
    try {
      const res = await newRequest.post("/auth/register/coach", {
        firstName: fName,
        lastName: lastName,
        password: password,
        gender: gender,
        moNumber: mobileNumber,
        whatsApp: whatsapp,
        email: email,
      });
      console.log(res);
      if (res.data === "New user has been created!") {
        message.success(res.data);
      } else {
        message.error(res.data);
      }

      // update the auth context
      dispatch({ type: "LOGIN", payload: res.data });

      navigate("/login");

      setIsLoading(false);
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err.response.data);
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, setIsLoading };
};
export default useSignup;
