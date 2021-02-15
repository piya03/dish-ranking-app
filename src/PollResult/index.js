import React from "react";
import DishCard from "../CommonComponent/DishCard";
import { useDispatch, useSelector } from "react-redux";
import BackBtn from "../CommonComponent/BackBtn";
import { navigate } from "@reach/router";
const INDEXTOSCORE = {
  0: 30,
  1: 20,
  2: 10,
};
const PollResult = ({ pollId }) => {
  const activeUserFromStore = useSelector((state) => state.activeuser.username);

  const activePollObject = useSelector((state) => {
    return state?.pollsReducer?.polls?.find((each) => {
      return each.pollId === pollId;
    });
  });

  let scoreBoard = {};
  let allDishes = React.useMemo(() => {
    if (activePollObject?.pollInfo) {
      return Object.keys(activePollObject?.pollInfo || {}).reduce(
        (acc, elem) => {
          let dishesFOrThisUser =
            activePollObject?.pollInfo?.[elem]?.slice(0, 2) || [];
          dishesFOrThisUser = dishesFOrThisUser?.map((each, index) => {
            return {
              ...each,
              username: elem,
            };
          });
          acc = [...acc, ...dishesFOrThisUser];
          const rankDishesFoThisUser =
            activePollObject?.pollInfo?.[elem]?.[3]?.rankOfDishes;

          if (rankDishesFoThisUser) {
            rankDishesFoThisUser.forEach((each, index) => {
              if (scoreBoard[each] !== undefined) {
                scoreBoard[each] += INDEXTOSCORE[index] || 0;
              } else {
                scoreBoard[each] = INDEXTOSCORE[index] || 0;
              }
            });
          }
          return acc;
        },
        []
      );
    }
    return [];
  }, [activePollObject]);

  allDishes = allDishes.sort((a, b) => {
    return scoreBoard[b?.id] - scoreBoard[a?.id];
  });

  return (
    <div className="p-3" style={{ maxWidth: "450px", margin: "0px auto" }}>
      <BackBtn
        onClick={() => {
          navigate("/polls");
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontWeight: "500",
        }}
      >
        <h1 style={{ fontWeight: "500", fontSize: "1.25rem" }}>Poll Results</h1>
        <h2>{activePollObject?.question || "No Quesion title"}</h2>
        <h2>Created By {activePollObject?.createdByUser || ""}</h2>
      </div>
      {allDishes &&
        allDishes.map((each, index) => {
          return (
            <DishCard
              rank={index}
              each={each}
              key={each.id}
              showCheckBox={false}
              isCurrentUser={each?.username === activeUserFromStore}
              score={scoreBoard[each.id] || 0}
            />
          );
        })}
      {!allDishes?.length && (
        <div
          style={{
            height: "100px",
            display: "flex",
            alignItems: "center",
            border: "1px dashed",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          No Poll Results are available
        </div>
      )}
    </div>
  );
};

export default PollResult;
