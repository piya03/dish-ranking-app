import React from "react";
import CommonInput from "../CommonComponent/CommonInput";
import CommonUploadComponent from "./CommonUploadComponent";

const DishUploadForm = ({
  title,
  setTitle,
  discription,
  setDiscription,
  onChangeFile,
  imgUrl,
  uniqueId,
}) => {
  return (
    <div>
      <CommonUploadComponent
        onChangeFile={(e) => {
          onChangeFile(e, uniqueId);
        }}
        previewURL={imgUrl}
      />
      <div className="text-area-input">
        <CommonInput
          label="Dish Name"
          value={title}
          setValue={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          style={{
            border: "1px solid #a88ef2",
          }}
          placeholder="Write Discription of Dish"
          className="p-3 mb-3"
          cols="33"
          rows="6"
          value={discription}
          onChange={(e) => {
            setDiscription(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default DishUploadForm;
