import React, { useState } from "react";
import CommonInput from "../CommonComponent/CommonInput";
import CommonBtn from "../CommonComponent/CommonBtn";
import "./Login.css";

import { navigate } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { SET_ACTIVE_USER } from "./../reducers/users.reducer";

const Login = () => {
  const itemsData = useSelector((state) => {
    return {
      state,
    };
  });

  let allUser = itemsData.state.users.data;
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function logInFun() {
    const userIndex = allUser.findIndex((each) => {
      if (
        each.username.toLowerCase().trim() === userName.toLowerCase().trim() &&
        each.password === password
      ) {
        return true;
      } else {
        return false;
      }
    });
    if (userIndex !== -1) {
      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          username: allUser[userIndex].username,
        })
      );
      dispatch({
        type: SET_ACTIVE_USER,
        username: allUser[userIndex].username,
      });

      navigate("/polls");
    } else {
      setError("Please check the credentials again");
    }
  }
  return (
    <div className="loginContainer">
      <div className="innerContainer">
        <div className="iconBox">
          <p>Log in</p>
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
        </div>
        <CommonInput
          label="User Name"
          value={userName}
          setValue={(e) => {
            if (error) {
              setError("");
            }
            setUserName(e.target.value);
          }}
          error={!userName}
        />
        <div className="mt-3">
          <CommonInput
            label="Password"
            value={password}
            setValue={(e) => {
              if (error) {
                setError("");
              }
              setPassword(e.target.value);
            }}
            type="password"
            error={!password}
          />
        </div>
        {error && (
          <p
            className="mt-3 mb-3 text-sm text-center"
            style={{
              color: "#d91212",
            }}
          >
            {error}
          </p>
        )}
        <CommonBtn text=" LOG IN" handleClick={logInFun} />
      </div>
    </div>
  );
};

export default Login;
