import { Router, navigate } from "@reach/router";
import PollsListAndCreatePage from "../PollsListAndCreatePage";
import Poll from "../Poll";

import React, { useState } from "react";
import Login from "../LogIn/Login";

import { useDispatch, useSelector } from "react-redux";
const HomePage = () => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);

  // const dispatch = useDispatch();
  // const itemsData = useItemData();
  // const pageNo = itemsData.state.pageNo;
  // const perPagelimit = itemsData.state.perPagelimit;
  // // const [pageNo, setPageNo] = useState(1);
  // // const [perPagelimit, setPerPagelimit] = useState(3);
  // const indexOfLastPost = perPagelimit * pageNo; //  10* 3 = 30
  // const indexOfFirstPost = indexOfLastPost - perPagelimit; //30-10= 20

  // const sliceShow = itemsData?.state?.data
  //   ? itemsData?.state?.data?.slice(indexOfFirstPost, indexOfLastPost)
  //   : [];

  // const totalPage = Math.ceil(itemsData?.state?.totalCount / perPagelimit);
  const isLoggedIn = Boolean(activeUserFromStore);
  console.log("HomePage -> isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    navigate("/polls");
  }

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
            <Poll path="polls/:pollId" />
            <PollsListAndCreatePage path="polls" />
          </Router>
        </div>
      )}
    </div>
  );
};

export default HomePage;
