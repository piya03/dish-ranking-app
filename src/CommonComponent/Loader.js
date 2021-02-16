import React from "react";

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      style={{ transform: "translate(13px, -48px) scale(0.5)" }}
    >
      <circle fill="#000" cx={6} cy={50} r={6}>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin={0.1}
        />
      </circle>
      <circle fill="#000" cx={26} cy={50} r={6}>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin={0.2}
        />
      </circle>
      <circle fill="#000" cx={46} cy={50} r={6}>
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin={0.3}
        />
      </circle>
    </svg>
  );
};

export default Loader;
