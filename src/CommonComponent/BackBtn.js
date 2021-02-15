import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
const BackBtn = ({ onClick, passStyle = {} }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faBackward}
        className=" back"
        style={passStyle}
        onClick={onClick}
      />
    </div>
  );
};

export default BackBtn;
