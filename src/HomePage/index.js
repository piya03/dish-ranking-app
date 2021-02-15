import { Router, navigate } from "@reach/router";
import PollsListAndCreatePage from "../PollsListAndCreatePage";
import Poll from "../Poll";
import PollResult from "../PollResult";
import React, { useState } from "react";
import Login from "../LogIn/Login";

import { useDispatch, useSelector } from "react-redux";
const HomePage = () => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);

  const isLoggedIn = Boolean(activeUserFromStore);

  return (
    <div
      style={{
        height: "100%",
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
