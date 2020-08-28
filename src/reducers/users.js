import {
  RECEIVE_USERS,
  ADD_USER_QUESTION,
  ADD_USER_QUESTION_ANSWER
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    /* case ADD_USER_QUESTION_ANSWER:
      return {
        ...state,
        [action.auth]: {
          ...state[action.auth],
          answers: {
            ...state[action.auth].answers,
            [action.qid]: action.option
          }
        }
      }; */

    case ADD_USER_QUESTION_ANSWER:
      return {
        ...state,
        [action.qid]: action.answer,

        answers: {
          ...state[action.authedUser].answers
        },
        [action.authedUser]: {
          ...state[action.authedUser]
        }
      };

    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: state[action.authedUser].questions.concat([action.qid])
        }
      };
    default:
      return state;
  }
}
