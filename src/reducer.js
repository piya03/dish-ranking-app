import * as actions from "./actionTypes";

const initialState = {
  data: null,
  isFetching: false,
  isFetched: false,
  isFailure: false,
};
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
    default:
      return state;
  }
}
