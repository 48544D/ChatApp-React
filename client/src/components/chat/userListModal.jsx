import Modal from "react-modal";

Modal.setAppElement("#root");

const UserListModal = ({
  isOpen,
  users,
  onClose,
  onSelectUser,
  setSelectedUser,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Select a User</h2>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a user</option>
        {users
          ?.filter((user) => {
            return user._id !== currentUser._id;
          })
          .map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
      </select>
      <button onClick={onClose}>Cancel</button>
      <button onClick={onSelectUser}>Confirm</button>
    </Modal>
  );
};

export default UserListModal;
