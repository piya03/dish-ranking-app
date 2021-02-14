import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
const CreatePoll = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faPlusCircle}
        className="mr-2 cursor-pointer text-5xl"
      />
      <p className="text-base font-bold">Create A Poll</p>
    </div>
  );
};

export default CreatePoll;
