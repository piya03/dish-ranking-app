import React from "react";
import DishCard from "./DishCard";

const DishSelectionUI = ({ data, onChangeCheckBox, selectedArray }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
        Select upto 3 top dishes
      </h2>
      {data &&
        data.map((each, index) => {
          const isChecked = selectedArray.indexOf(each.id) !== -1;
          return (
            <DishCard
              each={each}
              isChecked={isChecked}
              key={each.id}
              onChange={(e) => {
                onChangeCheckBox(e.target.checked, each.id);
              }}
            />
          );
        })}
    </div>
  );
};

export default DishSelectionUI;
