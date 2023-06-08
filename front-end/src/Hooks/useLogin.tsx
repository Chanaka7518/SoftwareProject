import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import newRequest from "../Utils/newRequest";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const history = useNavigate();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await newRequest.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("userData", JSON.stringify(res.data));
      if (res.data.role === "Client" || res.data.role === "Coach") {
        history("/");
      } else if (res.data.role === "Admin") {
        history("/alf-admin");
      }
      dispatch({ type: "LOGIN", payload: res.data });
      console.log(res.data);
      setIsLoading(false);
    } catch (err: any) {
      message.error(err.response.data);
      console.log(err.response.data);
      setError(err.response.data);
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
