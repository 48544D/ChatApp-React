import React, { useContext } from "react";
import avatar from "../assets/avatar.svg";
import "../css/dropDownMenu.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const DropDownMenu = () => {
  const openMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
  };

  const { logoutUser, user } = useContext(AuthContext);

  return (
    <div className="userIcon" onClick={() => openMenu()}>
      <img src={avatar} className="img-fluid" />
      <h2>{user?.username}</h2>
      <div className="menu">
        <div className="menu-item">
          <Link to="/profile" className="link-dark text-decoration-none">
            Profile
          </Link>
        </div>
        <div className="menu-item" onClick={logoutUser}>
          <p to="/" className="link-dark m-0">
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
