import { getUser } from "../utils/api.js";
import { showLoading, hideLoading } from "react-redux-loading-bar";
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGN_OUT = "SIGN_OUT";
export const UNSET_AUTHED_USER = "SUNSET_AUTHED_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}

export function unsetAuthedUser() {
  return {
    type: UNSET_AUTHED_USER
  };
}

export function receiveLoginUser(user) {
  return {
    type: LOGIN_USER,
    authenticated: true,
    loggedInUser: user
  };
}

export function logOutUser() {
  return {
    type: LOGOUT_USER,
    authenticated: null,
    loggedInUser: null
  };
}

export function handleLoginUser(id) {
  return dispatch => {
    dispatch(showLoading());
    getUser(id).then(user => {
      dispatch(receiveLoginUser(user));
      dispatch(hideLoading());
    });
  };
}

export function handleLogoutUser(id) {
  return dispatch => {
    dispatch(showLoading());
    getUser(id).then(user => {
      dispatch(logOutUser(user));
      dispatch(hideLoading());
    });
  };
}

export function signOut(id) {
  return {
    type: SIGN_OUT,
    id
  };
}
