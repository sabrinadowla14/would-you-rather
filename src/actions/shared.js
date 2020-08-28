import {
  getInitialData,
  saveQuestionAnswer,
  saveQuestion,
  getInitialQuestions,
  getInitialUsers
} from "../utils/api";
import { receiveUsers, addUserQuestion, addUserQuestionAnswer } from "./users";
import { receiveQuestions, addQuestion, addQuestionAnswer } from "./questions";
import { setAuthedUser } from "./authedUser";
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
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleInitialQuestions() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialQuestions().then(({ questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleInitialUsers(AUTHED_ID) {
  return dispatch => {
    dispatch(showLoading());
    return getInitialUsers().then(({ users }) => {
      dispatch(receiveUsers(users));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const author = authedUser;
    dispatch(showLoading());
    saveQuestion({
      optionOneText,
      optionTwoText,
      author
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
      dispatch(hideLoading());
    });
  };
}

export function handleAddQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestionAnswer({
      qid,
      answer,
      authedUser
    })
      .then(() => {
        dispatch(
          addQuestionAnswer({
            qid,
            answer,
            authedUser
          })
        );
        dispatch(addUserQuestionAnswer(qid, answer, authedUser));
      })
      .then(() => dispatch(hideLoading()));
  };
}
