import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "./../reducers/users.reducer";

const Logout = () => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);
  const dispatch = useDispatch();

  function logOutFun() {
    localStorage.clear();
    dispatch({
      type: SET_ACTIVE_USER,
      username: "",
    });
  }
  return (
    <div className="logoutContainer">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faUserCircle} className="user-icon mr-2" />
        <p>{activeUserFromStore}</p>
      </div>
      <p onClick={logOutFun} className="cursor-pointer">
        Logout
      </p>
    </div>
  );
};

export default Logout;
