import { navigate } from "@reach/router";
import React from "react";
import Card from "../CommonComponent/Card";
import useItemData from "../useItemData";

const HomePage = () => {
  const itemsData = useItemData();
  return (
    <div>
      <React.Fragment>
        <div className="App">
          {itemsData?.state?.data?.map((each, index) => {
            return (
              <Card
                key={index}
                each={each}
                handleOnClick={() => {
                  navigate(`productdetails/${each?.id}`);
                }}
              />
            );
          })}
        </div>
      </React.Fragment>
    </div>
  );
};

export default HomePage;
