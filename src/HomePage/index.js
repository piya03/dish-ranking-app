import { Router, navigate } from "@reach/router";
import PollsListAndCreatePage from "../PollsListAndCreatePage";
import Poll from "../Poll";
import PollResult from "../PollResult";
import React, { useState, useEffect } from "react";
import Login from "../LogIn/Login";

import { useDispatch, useSelector } from "react-redux";
const HomePage = () => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);

  const isLoggedIn = Boolean(activeUserFromStore);
  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/polls");
    }
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  return (
    <div
      style={{
        height: "100vh",
        position: "fixed",
        left: "0",
        top: "0",
        right: "0",
        overflow: "auto",
      }}
    >
      {!isLoggedIn && <Login />}

      {isLoggedIn && (
        <div
          style={{
            paddingTop: "60px",
          }}
        >
          <Router>
            <PollResult path="polls/results/:pollId" />
            <Poll path="polls/:pollId" />

            <PollsListAndCreatePage path="polls" exact />
          </Router>
        </div>
      )}
    </div>
  );
};

export default HomePage;
