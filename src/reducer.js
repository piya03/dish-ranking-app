import * as actions from "./actionTypes";

const initialState = {
  data: null,
  isFetching: false,
  isFetched: false,
  isFailure: false,
  perPagelimit: 3,
  pageNo: 1,
  totalCount: 20,
};
// const indexOfLastPost = perPagelimit * pageNo; //  10* 3 = 30
// const indexOfFirstPost = indexOfLastPost - perPagelimit; //30-10= 20
// const sliceShow = data.slice(indexOfFirstPost, indexOfLastPost);
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_ITEMS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actions.FETCH_ITEMS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        data: payload,
        isFetching: false,
        isFetched: true,
      };
    }
    case actions.FETCH_ITEMS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        isFailure: true,
      };
    }
    case actions.INCREMENT_PAGE_NO: {
      const { pageNo } = action;
      return {
        ...state,
        pageNo: pageNo,
      };
    }
    case actions.DECREMENT_PAGE_NO: {
      const { pageNo } = action;
      return {
        ...state,
        pageNo: pageNo,
      };
    }

    default:
      return state;
  }
}
