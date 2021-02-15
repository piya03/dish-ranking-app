import React, { useState } from "react";
import DishCard from "./DishCard";

const DishRankingUI = ({ data, onChangeOrder, order, selectedArray }) => {
  // const [selectedData, setSelectedData] = useState(data);

  // [sdasddsads, dsasd]
  // [dsadsas], dsasds

  // let finalSelectedDate = React.useMemo(() => {
  //   if(order?.length > 0) {
  //       order.map((each) => {
  //         return  selectedData
  //       })
  //   }
  // }, [data])

  // [selectedData]

  let finalData = data.filter((each) => {
    if (selectedArray.indexOf(each.id) !== -1) {
      return true;
    }
    return false;
  });

  if (order.length) {
    finalData = order
      .map((eachId) => {
        const newItem = finalData.find((elem) => elem.id === eachId);
        if (newItem) {
          return newItem;
        }
        return null;
      })
      .filter(Boolean);
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
        Rank your dishes
      </h2>
      {finalData &&
        finalData.map((each, index) => {
          return (
            <DishCard
              onChangeOrder={onChangeOrder}
              moveUpFun={() => {
                if (index > 0) {
                  let temp = finalData[index];
                  finalData[index] = finalData[index - 1];
                  finalData[index - 1] = temp;
                  // update ref
                  onChangeOrder(finalData.map((each) => each.id));
                  // setSelectedData([...finalData]);
                }
              }}
              moveDownFun={() => {
                if (index < finalData.length - 1) {
                  let temp = finalData[index];
                  finalData[index] = finalData[index + 1];
                  finalData[index + 1] = temp;

                  // update ref
                  onChangeOrder(finalData.map((each) => each.id));
                  // setSelectedData([...selectedData]);
                }
              }}
              rank={index}
              each={each}
              key={each.id}
              showArrow={true}
              showCheckBox={false}
            />
          );
        })}
    </div>
  );
};

export default DishRankingUI;
