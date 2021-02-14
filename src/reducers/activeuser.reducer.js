function currentUser() {
  try {
    return JSON.parse(localStorage.getItem("activeUser"))?.username;
  } catch (e) {
    return "";
  }
}

const initialState = {
  username: currentUser(),
};

export const SET_ACTIVE_USER = "SET_ACTIVE_USER";

export default function activeuser(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_USER: {
      return {
        ...state,
        username: action.username,
      };
    }

    default:
      return state;
  }
}
