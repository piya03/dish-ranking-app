import { combineReducers } from "redux";

import { activeuser, polls, users } from "./reducers";
export default combineReducers({
  activeuser,
  pollsReducer: polls,
  users,
});
