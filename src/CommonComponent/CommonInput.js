import React, { useRef, useEffect, useState } from "react";
import "./style.css";

function CommonInput({
  value,
  setValue,
  onChangeFun,
  onBlurFun,
  label,
  error = false,
  type = "text",
}) {
  const lableRef = useRef(null);
  const inputRef = useRef(null);
  function onfocusFun() {
    lableRef.current.style.top = "-12px";
    lableRef.current.style.left = "12px";
    lableRef.current.style.transition = "all .2s";
  }
  function onBlurFun() {
    if (value) {
      inputRef.current.style.border = "1px solid #a88ef2";

      return;
    }
    if (!value) {
      inputRef.current.style.border = "1px solid red";
      lableRef.current.style.color = "red";
    }
    lableRef.current.style.top = "15px";
    lableRef.current.style.left = "15px";
    lableRef.current.style.transition = "all .2s";
  }

  function onChangeFun(e) {
    lableRef.current.style.color = "#6b6b6b";
    setValue(e);
  }
  useEffect(() => {
    if (value) {
      lableRef.current.style.top = "-12px";
      lableRef.current.style.left = "12px";
      lableRef.current.style.transition = "all .2s";
    }
    inputRef.current.click();
  });

  return (
    <div className="relative">
      <div className="inputBox">
        <label
          onClick={(e) => {
            inputRef.current.focus();
          }}
          htmlFor=""
          className="inputLable"
          ref={lableRef}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          className="input"
          type={type}
          value={value}
          onChange={onChangeFun}
          onFocus={onfocusFun}
          onBlur={onBlurFun}
        />
      </div>
    </div>
  );
}

export default CommonInput;
