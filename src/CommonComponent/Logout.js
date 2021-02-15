import React from "react";
import { navigate } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER } from "./../reducers/users.reducer";

const Logout = () => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);
  const dispatch = useDispatch();

  function logOutFun() {
    // localStorage.clear();
    localStorage.removeItem("activeUser");
    dispatch({
      type: SET_ACTIVE_USER,
      username: "",
    });
  }
  return (
    <div className="logoutContainer">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/polls")}
      >
        <FontAwesomeIcon icon={faUserCircle} className="user-icon mr-2" />
        <p>{activeUserFromStore}</p>
      </div>
      {activeUserFromStore && (
        <p onClick={logOutFun} className="cursor-pointer">
          Logout
        </p>
      )}
    </div>
  );
};

export default Logout;
