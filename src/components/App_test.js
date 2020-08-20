import React, { Component, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";
import { handleInitialData } from "../actions/shared";
import User from "./User";
import LeaderBoard from "./LeaderBoard";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import Question from "./Question";
import SelOpt from "./SelOpt";

import { isEmpty } from "../utils/helpers";
//import Routes from "./components/Routes";
//import NavBar from "./components/NavBar";
//import Login from "./components/Login";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return <div>{this.props.loading === true ? null : <SelOpt />}</div>;
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
    //notLoggedIn: authedUser === null
  };
}

export default connect()(App);
