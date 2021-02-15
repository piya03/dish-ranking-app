import React, { useRef, useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const CommonUploadComponent = ({ onChangeFile, previewURL, children }) => {
  const inputRef = useRef(null);

  return (
    <div>
      <div
        onClick={() => {
          inputRef.current.click();
        }}
      >
        <input
          type="file"
          id="avatar"
          name="avatar"
          ref={inputRef}
          accept="image/png, image/jpeg"
          onChange={onChangeFile}
          className="hidden"
        />

        {!children && (
          <>
            <div className="uploadImg">
              {!previewURL && (
                <FontAwesomeIcon icon={faCloudUploadAlt} className=" mr-2" />
              )}{" "}
              {previewURL ? (
                <div className="relative">
                  <FontAwesomeIcon icon={faEdit} className="edit" />
                  <img src={previewURL} className="img-style" />
                </div>
              ) : null}
            </div>
          </>
        )}

        {children && children}
      </div>{" "}
    </div>
  );
};

export default CommonUploadComponent;
