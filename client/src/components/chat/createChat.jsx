import { useFetchUsers } from "../../hooks/useFetchUsers";
import React, { useContext, useState } from "react";
import UserListModal from "./userListModal.jsx";
import "../../css/userModal.css";
import { ChatContext } from "../../context/chatContext";

const CreateChat = () => {
  const { users, error } = useFetchUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const { createChat } = useContext(ChatContext);

  const openModal = () => {
    setIsModalOpen(true);
    setSelectedUser("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser("");
  };

  const handleSelectUser = () => {
    if (selectedUser) {
      createChat(selectedUser);
    }
  };

  return (
    <>
      <button onClick={openModal}>Create Chat</button>
      <UserListModal
        isOpen={isModalOpen}
        users={users}
        onClose={closeModal}
        onSelectUser={(user) => {
          setSelectedUser(user);
          handleSelectUser();
          closeModal();
        }}
        setSelectedUser={setSelectedUser}
      />
    </>
  );
};

export default CreateChat;
