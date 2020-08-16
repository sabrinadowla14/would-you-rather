import { getInitialData, saveQuestionAnswer, saveQuestion } from "../utils/api";
import { receiveUsers, addUserQuestion, addUserQuestionAnswer } from "./users";
import { addQuestion, addQuestionAnswer } from "./questions";
//import { setAuthedUser } from "../actions/authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

/* This function is going to use the Redux return pattern because we want to make an
asynchronous request in side this function, we will call getInitialData() function that will
return us a promise, which will pass to us an object that has users and tweets property.
we want to take users and tweets and add them to the state of our Redux store. 
To do that we will need to dispatch a few different actions           */
export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(addQuestion(questions));
      dispatch(hideLoading());
    });
  };
}
export function handleAddQuestion(optionOneText, optionTwoText, callback) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const { authedUser } = getState();

    saveQuestion({
      optionOneText,
      optionTwoText,
      authedUser
    })
      .then(question => {
        dispatch(addUserQuestion(question));
        dispatch(addQuestion(question));
        dispatch(showLoading());
      })
      .then(callback);
  };
}

export function handleAddQuestionAnswer(qid, selectedOption) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    const { login } = getState();
    const authedUser = login.loggedInUser.id;

    saveQuestionAnswer({
      authedUser,
      qid: qid,
      answer: selectedOption
    }).then(() => {
      dispatch(addQuestionAnswer(authedUser, qid, selectedOption));
      dispatch(addUserQuestionAnswer(authedUser, qid, selectedOption));
      dispatch(hideLoading());
    });
  };
}
