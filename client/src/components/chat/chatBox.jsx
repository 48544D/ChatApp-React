import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipient } from "../../hooks/useFetchrecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "../../css/chatBox.scss";

const ChatBox = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipient } = useFetchRecipient(currentChat);
  const [textMessage, setTextMessage] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const messagesContainerRef = useRef(null);

  const emojiSelect = (emoji) => {
    setTextMessage(textMessage + emoji.native);
    setPickerOpen(false);
    const inputElement = document.getElementById("text-input");
    if (inputElement) {
      inputElement.focus();
    }
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  if (!currentChat)
    return <p style={{ textAlign: "center", width: "100%" }}>Select a chat</p>;

  if (isMessagesLoading)
    return <p style={{ textAlign: "center", width: "100%" }}>Loading...</p>;

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipient?.username}</strong>
      </div>
      <Stack gap={3} className="messages" ref={messagesContainerRef}>
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
        <input
          className="text-input"
          id="text-input"
          type="text"
          autoFocus
          placeholder="Type a message"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendTextMessage(textMessage, currentChat, setTextMessage);
            }
          }}
          autoComplete="off"
        />

        <div className="emoji">
          {pickerOpen && (
            <div className="emoji-picker">
              <Picker
                data={data}
                onEmojiSelect={(emoji) => emojiSelect(emoji)}
                title="Pick your emoji…"
                emoji="point_up"
                style={{ position: "absolute", bottom: "100px", right: "20px" }}
              />
            </div>
          )}
          <button
            className="emoji-btn"
            onClick={() => setPickerOpen(!pickerOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#fff"
              className="bi bi-emoji-smile"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Zm-2.5 5a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5Zm5 0a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5Zm-4.5 4a2.5 2.5 0 0 1 5 0h-5Z"
              />
            </svg>
          </button>
        </div>

        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, currentChat, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16 "
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
