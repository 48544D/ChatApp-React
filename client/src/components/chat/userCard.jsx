import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/avatar.svg";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chatContext";
import moment from "moment";
import "../../css/userCard.scss";

const UserCard = ({ chat }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { recipient } = useFetchRecipient(chat, user);
  const { onlineUsers, notifications, setNotifications } =
    useContext(ChatContext);
  const [thisUserNotifications, setThisUserNotifications] = useState([]);

  useEffect(() => {
    const thisUserNotifications = notifications?.filter(
      (notification) =>
        notification.senderId === recipient?._id && !notification.isRead
    );
    setThisUserNotifications(thisUserNotifications);
  }, [notifications]);

  // mark notification as read on click
  const handleClick = () => {
    const thisUserNotifications = notifications?.filter(
      (notification) =>
        notification.senderId === recipient?._id && !notification.isRead
    );
    setThisUserNotifications(thisUserNotifications);
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.senderId === recipient?._id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-start p-2 justify-content-between"
      role="button"
      onClick={handleClick}
    >
      <div className="d-flex ">
        <div className="me-2">
          <img src={avatar} height={35} />
        </div>
        <div className="text-content">
          <div className="name">{recipient?.username}</div>
          <div className="text"></div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="d-flex align-items-baseline gap-2">
          {thisUserNotifications?.length > 0 && (
            <div className="date w-100">
              <p className="w-100">
                {moment(thisUserNotifications[0].date).calendar()}
              </p>
            </div>
          )}
          {onlineUsers?.some((user) => user.userId === recipient?._id) && (
            <div className="user-online"></div>
          )}
        </div>
        {thisUserNotifications?.length > 0 &&
          !thisUserNotifications[0].isRead && (
            <div className="this-user-notifications">
              {thisUserNotifications.length}
            </div>
          )}
      </div>
    </Stack>
  );
};

export default UserCard;
