import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./actionTypes";

function useItemData(props) {
  const dispatch = useDispatch();

  async function getProductItems() {
    try {
      dispatch({
        type: actions.FETCH_ITEMS_REQUEST,
      });
      const res = await axios.get(`https://gorest.co.in/public-api/products`);
      console.log("getProductItems -> res", res);
      if (res?.status === 200) {
        dispatch({
          type: actions.FETCH_ITEMS_SUCCESS,
          payload: res?.data?.data?.map((each) => {
            return {
              ...each,
              randomRatingNum: Math.floor(Math.random() * Math.floor(5) + 1),
            };
          }),
        });
      } else {
        dispatch({
          type: actions.FETCH_ITEMS_FAILURE,
        });
      }
    } catch (e) {
      dispatch({
        type: actions.FETCH_ITEMS_FAILURE,
      });
    }
  }
  useEffect(() => {
    if (!itemsData?.state?.data) getProductItems();
  }, []);

  const itemsData = useSelector((state) => {
    return {
      state,
    };
  });

  return itemsData;
}

export default useItemData;
