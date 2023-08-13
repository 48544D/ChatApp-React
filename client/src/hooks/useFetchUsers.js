import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchUsers = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/user`, token);

      if (response.isError) {
        console.log(response.error);
        return setError(response.error);
      }

      setUsers(response);
    };
    getUsers();
  }, []);

  return { users, error };
};
