const initialState = {
  data: [
    {
      username: "anil",
      password: "anil123",
    },
    {
      username: "sunil",
      password: "sunil123",
    },
    {
      username: "sudhir",
      password: "sudhir123",
    },
    {
      username: "reena",
      password: "reena123",
    },
    {
      username: "beena",
      password: "beena123",
    },
    {
      username: "ravi",
      password: "ravi123",
    },
    {
      username: "radha",
      password: "radha123",
    },
    {
      username: "ruchi",
      password: "ruchi123",
    },
    {
      username: "payal",
      password: "payal123",
    },
    {
      username: "priyanka",
      password: "priyanka123",
    },
  ],
};
// const indexOfLastPost = perPagelimit * pageNo; //  10* 3 = 30
// const indexOfFirstPost = indexOfLastPost - perPagelimit; //30-10= 20
// const sliceShow = data.slice(indexOfFirstPost, indexOfLastPost);

export const SET_ACTIVE_USER = "SET_ACTIVE_USER";

export default function users(state = initialState, action) {
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
