import React, { useState } from "react";
import "./style.css";
import Logout from "../CommonComponent/Logout";
import CreatePoll from "./CreatePoll";
import CommonBtn from "../CommonComponent/CommonBtn";
import { v4 as uuidv4 } from "uuid";
import { CREATE_POLL } from "./../reducers/polls.reducer";
import CommonInput from "../CommonComponent/CommonInput";

import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@reach/router";

function PollsListAndCreatePage(props) {
  const [showPollQuestion, setPollQuestion] = useState(false);
  const activeUserFromStore = useSelector((state) => state.activeuser.username);
  const [question, setQuestion] = useState("");

  const pollsDataInStore = useSelector((state) => state.pollsReducer.polls);
  const dispatch = useDispatch();

  function submitPollQuestion() {
    if (!question) {
      return;
    }
    console.log("submitPollQuestion");
    // localStorage.setItem(
    //   "activeUser",
    //   JSON.stringify({
    //     username: "",
    //   })
    // );
    dispatch({
      type: CREATE_POLL,
      pollId: uuidv4(),
      question: question,
      createdAt: new Date(),
      createdByUser: activeUserFromStore,
    });
    setPollQuestion(false);
    setQuestion("");

    //uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  }
  return (
    <>
      <Logout />
      {!showPollQuestion && (
        <div
          className="createPollContainer"
          onClick={() => setPollQuestion(true)}
        >
          <CreatePoll />
        </div>
      )}
      {showPollQuestion && (
        <>
          <div className="pollQuestion">
            <CommonInput
              label="Question Title"
              value={question}
              setValue={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              width: "100px",
              margin: "auto",
            }}
          >
            <CommonBtn text=" SUBMIT" handleClick={submitPollQuestion} />{" "}
          </div>
        </>
      )}
      {
        <div className="polls-list-container">
          <h2 className="active-poll-label">Active Polls</h2>

          <div className="polls-list">
            {pollsDataInStore &&
              pollsDataInStore.map((each) => {
                return (
                  <div
                    className="poll-item"
                    key={each.pollId}
                    onClick={() => {
                      navigate(`polls/${each.pollId}`);
                    }}
                  >
                    {each.question}
                  </div>
                );
              })}
          </div>
        </div>
      }
    </>
  );
}

export default PollsListAndCreatePage;
