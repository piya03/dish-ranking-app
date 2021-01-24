import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faStar } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

function Card({ each, handleOnClick }) {
  let discription = each?.description?.split(" ").slice(0, 4).join(" ");

  return (
    <div>
      <div className="cardContainer cursor-pointer" onClick={handleOnClick}>
        <div className="forBg">
          <div className="image-section flex items-center justify-center">
            <img className="rounded mt-20 w-full" src={each?.image} alt="" />
          </div>
        </div>
        <div className="info text-center">
          <p
            style={{
              color: "#0a9d0a",
            }}
          >
            {each?.name}
          </p>
          <p className="text-sm"> {discription}...</p>
        </div>

        <div className="task flex justify-evenly mt-8 pb-8 text-center">
          <div className="complete ">
            <p className="text-sm text-black font-semibold">PRICE</p>
            <p className="bg-color rounded px-1">
              {" "}
              <FontAwesomeIcon icon={faRupeeSign} className="text-sm" />
              <span className="pr-1"> {each?.price}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-black font-semibold">RATING </p>
            <p className="bg-color rounded">
              {" "}
              <FontAwesomeIcon icon={faStar} className="info-icon" />
              <span className=""> {each?.randomRatingNum}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
