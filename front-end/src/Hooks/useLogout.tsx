import newRequest from "../Utils/newRequest";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const history = useNavigate();
  const logout = async () => {
    try {
      await newRequest.post("/auth/logout");
      // remove user from storage
      localStorage.removeItem("userData");
      history("/");
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err);
    }
  };

  return { logout };
};
