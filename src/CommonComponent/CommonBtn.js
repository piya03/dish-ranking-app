import React from "react";

const CommonBtn = ({ text, handleClick, passStyle = {} }) => {
  return (
    <div>
      <button onClick={handleClick} className="logInbtn" style={passStyle}>
        {text}
      </button>
    </div>
  );
};

export default CommonBtn;
