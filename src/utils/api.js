import {
  _getUsers,
  _getUser,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function getInitialUsers() {
  return Promise.all([_getUser()]).then(([users]) => ({
    users
  }));
}

export function getInitialQuestions() {
  return Promise.all([_getQuestions()]).then(([questions]) => ({
    questions
  }));
}

export function saveQuestionAnswer(info) {
  return _saveQuestionAnswer(info);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function getUser(id) {
  return _getUser(id);
}

export function getUsers() {
  return _getUsers();
}

export function getQuestions() {
  return _getQuestions();
}
