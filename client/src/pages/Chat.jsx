import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserCard from "../components/chat/userCard.jsx";
import { AuthContext } from "../context/authContext";
import CreateChat from "../components/chat/createChat";
import ChatBox from "../components/chat/chatBox";

const Chat = () => {
  const { userChats, isLoading, updateChat } = useContext(ChatContext);

  return (
    <>
      <CreateChat />
      <Container>
        {userChats.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isLoading && <p>Loading...</p>}
              {userChats.map((chat, index) => (
                <div key={index} onClick={() => updateChat(chat)}>
                  <UserCard chat={chat} />
                </div>
              ))}
            </Stack>
            <ChatBox />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Chat;
