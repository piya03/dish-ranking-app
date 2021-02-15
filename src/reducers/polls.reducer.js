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

export const CREATE_POLL = "CREATE_POLL";

export const SUBMIT_POLL_INFO = "SUBMIT_POLL_INFO";

export const SET_ACTIVE_POLL_ID = "SET_ACTIVE_POLL_ID";

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

    case SET_ACTIVE_POLL_ID: {
      const { pollId } = action;
      return {
        ...state,
        activePollId: pollId,
      };
    }
    case SUBMIT_POLL_INFO: {
      const { data, activePollId, username } = action;

      const indexPoll = state.polls.findIndex((each) => {
        return each.pollId === activePollId;
      });
      if (indexPoll !== -1) {
        const pollData = { ...state.polls[indexPoll] };

        if (pollData.pollInfo) {
          pollData.pollInfo[username] = data;
        } else {
          pollData.pollInfo = {};
          pollData.pollInfo[username] = data;
        }

        const newPolls = [...state.polls];
        newPolls[indexPoll] = pollData;

        const newState = {
          ...state,
          polls: newPolls,
        };
        localStorage.setItem("polls", JSON.stringify(newState.polls));
        return newState;
      }

      return state;
    }

    default:
      return state;
  }
}
