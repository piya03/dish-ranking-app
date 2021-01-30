import { navigate } from "@reach/router";
import React, { useState } from "react";
import Card from "../CommonComponent/Card";
import useItemData from "./../useItemData";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./../actionTypes";

const HomePage = () => {
  const dispatch = useDispatch();
  const itemsData = useItemData();
  const pageNo = itemsData.state.pageNo;
  const perPagelimit = itemsData.state.perPagelimit;
  // const [pageNo, setPageNo] = useState(1);
  // const [perPagelimit, setPerPagelimit] = useState(3);
  const indexOfLastPost = perPagelimit * pageNo; //  10* 3 = 30
  const indexOfFirstPost = indexOfLastPost - perPagelimit; //30-10= 20

  const sliceShow = itemsData?.state?.data
    ? itemsData?.state?.data?.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const totalPage = Math.ceil(itemsData?.state?.totalCount / perPagelimit);

  return (
    <div>
      <React.Fragment>
        <div className="App">
          {sliceShow?.map((each, index) => {
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
          <div>
            <button
              onClick={() => {
                // if (pageNo !== 1) setPageNo((page) => page - 1);
                if (pageNo > 1) {
                  dispatch({
                    type: actions.DECREMENT_PAGE_NO,
                    pageNo: itemsData?.state?.pageNo - 1,
                  });
                }
              }}
              className="cursor-pointer"
            >
              prev
            </button>
            <button
              onClick={() => {
                // if (sliceShow.length && totalPage !== pageNo) {
                //   setPageNo((page) => page + 1);
                // } else {
                //   setPageNo(1);
                // }
                if (itemsData?.state?.pageNo + 1 <= totalPage) {
                  dispatch({
                    type: actions.INCREMENT_PAGE_NO,
                    pageNo: itemsData?.state?.pageNo + 1,
                  });
                }
              }}
              className="corsor-pointer ml-4"
            >
              next
            </button>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default HomePage;
