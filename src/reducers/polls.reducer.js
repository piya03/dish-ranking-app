function getPollsFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("polls")) || [];
  } catch (e) {
    return [];
  }
}
const initialState = {
  polls: getPollsFromLocalStorage(),
  activePollId: "",
};

// const indexOfLastPost = perPagelimit * pageNo; //  10* 3 = 30
// const indexOfFirstPost = indexOfLastPost - perPagelimit; //30-10= 20
// const sliceShow = data.slice(indexOfFirstPost, indexOfLastPost);

const SET_ACTIVE_USER = "SET_ACTIVE_USER";

export const CREATE_POLL = "CREATE_POLL";

export const SUBMIT_POLL_INFO = "SUBMIT_POLL_INFO";

// {
//     username: "anil",
//     uploadedDishes: [
//       {
//         answerId: "uuid create",
//         lasUpdated: "12-03-56",
//         answerArray: [
//           {
//             type: "image",
//             key: "image",
//             value: "https://sdada.com.a.jpg",
//           },
//           {
//             type: "string",
//             key: "details",
//             value: "Biaigan ka bharta is delicious",
//           },
//           {
//             type: "string",
//             key: "name",
//             value: "Biaigan ka bharta",
//           },
//         ],
//       },
//       {
//         answerId: "uuid create",
//         lasUpdated: "12-03-56",
//         answerArray: [
//           {
//             type: "image",
//             key: "image",
//             value: "https://sdada.com.a.jpg",
//           },
//           {
//             type: "string",
//             key: "details",
//             value: "Biaigan ka bharta is delicious",
//           },
//           {
//             type: "string",
//             key: "name",
//             value: "Biaigan ka bharta",
//           },
//         ],
//       },
//     ],
//   },

export default function poll(state = initialState, action) {
  switch (action.type) {
    case CREATE_POLL: {
      const { pollId, question, createdAt, createdByUser } = action;

      const newObj = {
        ...state,
        polls: [
          ...state.polls,
          {
            pollId: pollId,
            question: question,
            createdAt: createdAt,
            createdByUser: createdByUser,
          },
        ],
      };
      localStorage.setItem("polls", JSON.stringify(newObj.polls));
      return newObj;
    }

    case SUBMIT_POLL_INFO: {
      //     const {data} = action

      //     const { username } = data

      //   return {
      //     ...state,
      //    polls: [...state.polls, {
      //        pollId: pollId,
      //    }]
      //   };
      return state;
    }

    default:
      return state;
  }
}
