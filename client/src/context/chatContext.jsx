import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services.js";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [userChats, setUserChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // socket initialization
  useEffect(() => {
    const newSocket = io("https://react-chat-app-qdun.onrender.com");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [userId]);

  // get online users
  useEffect(() => {
    if (!socket) return;
    socket.emit("addNewUser", userId);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => socket.off("getOnlineUsers");
  }, [socket]);

  // send message
  useEffect(() => {
    if (!socket) return;

    const recipientId = currentChat?.members.find(
      (member) => member !== userId
    );

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  // recieve message and notification
  useEffect(() => {
    if (!socket) return;

    socket.on("getMessage", (res) => {
      currentChat?._id === res.chatId && setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?._id === res.chatId;

      if (isChatOpen) {
        setNotifications((prev) => [...prev, { ...res, isRead: true }]);
      } else {
        setNotifications((prev) => [...prev, res]);
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  });

  // fetch user chats
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

  // fetch chat messages
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

  // send text message
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
      setNewMessage(response);
      setMessages((prevMessages) => [...prevMessages, response]);
    }
  );

  // update current chat
  const updateChat = useCallback((chat) => {
    setCurrentChat(chat);
  });

  // create new chat
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
        onlineUsers,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
