import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      const response = await postRequest(
        `${baseUrl}/auth/register`,
        new URLSearchParams(Object.entries(registerInfo)).toString()
      );
      setIsRegisterLoading(false);

      if (response.isError) {
        return toast.error(response.error);
      }

      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        isRegisterLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
