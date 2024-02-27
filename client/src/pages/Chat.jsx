import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Stack } from "react-bootstrap";
import UserCard from "../components/chat/userCard.jsx";
import CreateChat from "../components/chat/createChat";
import ChatBox from "../components/chat/chatBox";
import "../css/chat.scss";

const Chat = () => {
  const { userChats, isLoading, updateChat } = useContext(ChatContext);

  return (
    <div className="chat-container">
      <div className="contact-box">
        <div className="contact-header">
          <h2>Chats</h2>
          <CreateChat />
        </div>
        <div className="line"></div>
        {userChats.length < 1 ? null : (
          <Stack
            direction="horizontal"
            gap={4}
            className="contacts align-items-start h-100 overflow-auto"
          >
            <Stack className="userCard-container flex-grow-0 pe-3" gap={3}>
              {isLoading && <p>Loading...</p>}
              {userChats.map((chat, index) => (
                <div key={index} onClick={() => updateChat(chat)}>
                  <UserCard chat={chat} />
                </div>
              ))}
            </Stack>
          </Stack>
        )}
      </div>
      <ChatBox />
    </div>
  );
};

export default Chat;
