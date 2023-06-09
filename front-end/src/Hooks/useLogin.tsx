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

    //   axios
    //     .post("http://localhost:5001/api/auth/login", {
    //       email: email,
    //       password: password,
    //     })
    //     .then(function (response: any) {
    //       // save the user to local storage
    //       // localStorage.setItem(
    //       //   "userData",
    //       //   JSON.stringify({
    //       //     userId: response.data.userId,
    //       //     token: response.data.token,
    //       //     email: response.data.email,
    //       //     userRole: response.data.userRole,
    //       //   })
    //       // );
    //       console.log(response);

    //       if (response.data.message === "Login success") {
    //         message.success(response.data);
    //         setIsLoading(false);
    //       } else {
    //         message.error(response.data.message);
    //         setIsLoading(false);
    //       }

    //       if (
    //         response.data.role === "Client" ||
    //         response.data.role === "HeadCoach"
    //       ) {
    //         history("/");
    //       } else if (response.data.userRole === "Admin") {
    //         history("/alf-admin");
    //       }

    //       // update the auth context
    //       dispatch({ type: "LOGIN", payload: response.data });
    //       setIsLoading(false);
    //       // update loading state
    //     })
    //     .catch(function (error: any) {
    //       console.log(error.message);
    //       message.error(error.message);
    //     });

    try {
      const res = await newRequest.post("/auth/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("userData", JSON.stringify(res.data));
      if (res.data.role === "Client" || res.data.role === "HeadCoach") {
        history("/");
      } else if (res.data.userRole === "Admin") {
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
