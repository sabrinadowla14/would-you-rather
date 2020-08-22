import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getQuestions } from "../utils/api";

import { addUserQuestionAnswer } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";
export const ADD_QUESTION = "ADD_QUESTION";

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestionAnswer({ qid, answer, authedUser }) {
  return {
    type: ADD_QUESTION_ANSWER,
    answerInfo: {
      qid,
      answer,
      authedUser
    }
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

export function handleGetQuestions() {
  return dispatch => {
    dispatch(showLoading());
    return getQuestions().then(questions => {
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
