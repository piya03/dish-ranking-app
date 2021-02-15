import React, { useState } from "react";
import "./style.css";
import CreatePoll from "./CreatePoll";
import CommonBtn from "../CommonComponent/CommonBtn";
import { v4 as uuidv4 } from "uuid";
import { CREATE_POLL, SET_ACTIVE_POLL_ID } from "./../reducers/polls.reducer";
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
    if (!question.trim()) {
      return;
    }

    dispatch({
      type: CREATE_POLL,
      pollId: uuidv4(),
      question: question,
      createdAt: new Date(),
      createdByUser: activeUserFromStore,
    });
    setPollQuestion(false);
    setQuestion("");
  }
  return (
    <>
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
          <div className="pollQuestion mt-4">
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
            <CommonBtn text=" SUBMIT" handleClick={submitPollQuestion} />
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
                  <div>
                    <div
                      className="poll-item"
                      key={each.pollId}
                      onClick={() => {
                        navigate(`polls/${each.pollId}`);
                      }}
                    >
                      {each.question}
                    </div>
                    <div
                      style={{
                        width: "150px",
                        margin: "auto",
                        marginBottom: "30px",
                      }}
                    >
                      <CommonBtn
                        passStyle={{
                          color: "#000",
                          background: " #e2dafc",
                          marginTop: "0px",
                        }}
                        text=" View Results"
                        handleClick={() => {
                          navigate(`polls/results/${each.pollId}`);
                        }}
                      />
                    </div>
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
