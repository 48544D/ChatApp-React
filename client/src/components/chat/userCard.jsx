import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/avatar.svg";

const UserCard = ({ chat, user }) => {
  const { recipient, error } = useFetchRecipient(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-betwee"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height={35} />
        </div>
        <div className="text-content">
          <div className="name">{recipient?.username}</div>
          <div className="text">Text message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/3/2023</div>
        <div className="this-user-notifications">2</div>
        <div className="user-online"></div>
      </div>
    </Stack>
  );
};

export default UserCard;
