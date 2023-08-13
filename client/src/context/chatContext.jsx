import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services.js";
import { toast } from "react-toastify";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [userChats, setUserChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;
    const fetchUserChats = async () => {
      setIsLoading(true);
      const response = await getRequest(`${baseUrl}/chat`, token);
      setIsLoading(false);

      if (response.isError) return toast.error(response.error);

      setUserChats(response);
    };

    fetchUserChats();
  }, []);

  useEffect(() => {
    if (!currentChat) return;
    const fetchChatMessages = async () => {
      setIsMessagesLoading(true);
      const response = await getRequest(
        `${baseUrl}/message/${currentChat?._id}`,
        token
      );
      setIsMessagesLoading(false);

      if (response.isError) return toast.error(response.error);

      setMessages(response);
    };
    fetchChatMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (text, currentChat, setTextMessage) => {
      if (!text) return;
      const response = await postRequest(
        `${baseUrl}/message`,
        new URLSearchParams({
          chatId: currentChat._id,
          text,
        }),
        token
      );

      if (response.isError) return toast.error(response.error);

      setTextMessage("");
      setMessages((prevMessages) => [...prevMessages, response]);
    }
  );

  const updateChat = useCallback((chat) => {
    setCurrentChat(chat);
  });

  const createChat = useCallback(async (recipient) => {
    if (!recipient) return toast.error("Please select a user to chat with");
    if (user === recipient) return toast.error("You cannot chat with yourself");
    if (userChats.some((chat) => chat.members.includes(recipient)))
      return toast.error("You are already chatting with this user");

    const response = await postRequest(
      `${baseUrl}/chat`,
      new URLSearchParams({ secondId: recipient }),
      token
    );

    if (response.isError) return toast.error(response.error);

    setUserChats((prevChats) => [...prevChats, response]);
  });

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        createChat,
        updateChat,
        currentChat,
        messages,
        isMessagesLoading,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
