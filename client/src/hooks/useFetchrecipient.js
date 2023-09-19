import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../utils/services";

export const useFetchRecipient = (chat) => {
  const [recipient, setRecipient] = useState(null);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const recipientId = chat?.members?.find((member) => member !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (recipientId) {
        const response = await getRequest(
          `${baseUrl}/user/${recipientId}`,
          token
        );

        if (response.isError) {
          return toast.error(response.error);
        }

        setRecipient(response);
      }
    };
    getUser();
  }, [recipientId]);

  return { recipient };
};
