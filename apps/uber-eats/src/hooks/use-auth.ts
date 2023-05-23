import { useContext, useState } from "react";
import { UserContext, UserContextType } from "./user-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as UserContextType;
  const [error, setError] = useState(null);

  const registerUser = async (data: any) => {
    const { username, email, password, passwordConfirm } = data;
    return axios
      .post(`/api/v1/auth-service/auth/register`, {
        username,
        email,
        password,
        passwordConfirm,
      })
      .then(async () => {
        await setUserContext();
      })
      .catch((err: any) => {
        setError(err.response.data);
      });
  };
  const setUserContext = async () => {
    return await axios
      .get("/api/v1/auth-service/users/profile")
      .then((res: any) => {
        setUser(res.data);
        navigate("/");
      })
      .catch((err: any) => {
        setError(err.response.data);
      });
  };
  const loginUser = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    return axios
      .post(`/api/v1/auth-service/auth/login`, data)
      .then(async () => {
        await setUserContext();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };
  const logoutUser = async () => {
    setUser(null);
    return axios
      .get(`/api/v1/auth-service/auth/logout`)
      .then(async () => {})
      .catch((err: any) => {
        setError(err.response.data);
      });
  };
  return {
    loginUser,
    registerUser,
    logoutUser,
    error,
  };
}
