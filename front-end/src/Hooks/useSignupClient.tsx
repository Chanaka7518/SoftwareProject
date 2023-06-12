import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import newRequest from "../Utils/newRequest";

const useSignupClient = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (
    fName: string,
    lastName: string,
    password: string,
    email: string,
    mobileNumber: string,
    gender: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await newRequest.post("/auth/register/client", {
        firstName: fName,
        lastName: lastName,
        password: password,
        email: email,
        mobileNumber: mobileNumber,
        gender: gender,
      });

      message.success(res.data);
      // update the auth context
      dispatch({ type: "LOGIN", payload: res.data });
      navigate("/login");

      // console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error.message);
      message.error(error.response.message);
      setIsLoading(false);
      navigate("/");
    }
  };

  return { signup, isLoading, error };
};
export default useSignupClient;
