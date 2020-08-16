import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading-bar";
/* Inside index.js file we want to import combined reducers and as
well as all the different reducers     */
export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer
});
