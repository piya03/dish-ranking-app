import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const DishCard = ({
  each,
  moveUpFun,
  moveDownFun,
  showArrow = false,
  showCheckBox = true,
  onChange,
  isChecked,
  rank,
  score,
  isCurrentUser,
}) => {
  return (
    <div className="relative">
      <div className="dishCard-container">
        <div className="flex justify-center">
          <div className="img-size mr-4">
            <img src={each?.imgURL} alt="" className="w-full h-full" />
          </div>
          <div className="">
            <p>{each?.title}</p>
            <p>{each?.discription?.slice(0, 40)} </p>
          </div>
        </div>

        {isCurrentUser && <div> Added by You</div>}
        {score !== undefined && (
          <div
            style={{
              fontSize: "30px",
              color: "rebeccapurple",
              fontWeight: "600",
            }}
          >
            {score}{" "}
          </div>
        )}
        {showCheckBox && (
          <input
            style={{
              height: "20px",
              width: "30px",
            }}
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              }
            }}
            type="checkbox"
            checked={isChecked}
          />
        )}
        {showArrow && (
          <div style={{ position: "absolute", right: "20px", top: "8px" }}>
            <strong>Rank: {rank + 1}</strong>
          </div>
        )}
        {showArrow && (
          <div className="arrow-up-down flex">
            <FontAwesomeIcon
              icon={faArrowUp}
              className=" mr-2 cursor-pointer arrow-icon w-20"
              onClick={moveUpFun}
            />
            <FontAwesomeIcon
              icon={faArrowDown}
              className=" mr-2 cursor-pointer arrow-icon w-20"
              onClick={moveDownFun}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DishCard;
