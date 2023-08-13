import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const updateInfo = useCallback((info) => {
    setInfo(info);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const response = await postRequest(
        `${baseUrl}/auth/register`,
        new URLSearchParams(Object.entries(info)).toString()
      );
      setIsLoading(false);

      if (response.isError) return toast.error(response.error);

      toast.success("Registered successfully");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    },
    [info]
  );

  const loginUser = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await postRequest(
      `${baseUrl}/auth/login`,
      new URLSearchParams(Object.entries(info)).toString()
    );
    setIsLoading(false);

    if (response.isError) return toast.error(response.error);

    toast.success("Logged in successfully");

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
      setUser(response.user);
      setToken(response.token);
    }, 1500);
  });

  const logoutUser = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        info,
        updateInfo,
        registerUser,
        isLoading,
        loginUser,
        logoutUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
