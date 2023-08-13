import { useContext, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipient } from "../../hooks/useFetchrecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipient } = useFetchRecipient(currentChat);
  const [textMessage, setTextMessage] = useState("");

  if (!currentChat)
    return <p style={{ textAlign: "center", width: "100%" }}>Select a chat</p>;

  if (isMessagesLoading)
    return <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>;

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipient?.username}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => (
            <Stack
              key={index}
              gap={1}
              className={`${
                message?.senderId === user?._id
                  ? "message self align-self-end flex-grow-0"
                  : "message align-self-start flex-grow-0"
              }`}
            >
              <span>{message.text}</span>
              <span className="message-footer">
                {moment(message.createdAt).calendar()}
              </span>
            </Stack>
          ))}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input ">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          cleanOnEnter
          onEnter={(text) => {
            sendTextMessage(text, currentChat, setTextMessage);
          }}
          borderColor="rgba(72, 112, 223, 0.2)"
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, currentChat, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
