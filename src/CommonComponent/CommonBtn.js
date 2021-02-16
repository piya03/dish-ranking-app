import React from "react";

const CommonBtn = ({ text, handleClick, disabled = false, passStyle = {} }) => {
  return (
    <div>
      <button
        onClick={handleClick}
        className="logInbtn"
        style={passStyle}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default CommonBtn;
