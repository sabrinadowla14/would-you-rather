import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import "../App.css";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./LeaderBoard";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { userNotLoggedIn, authedUser } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <NavBar />
            {this.props.loading === true ? null : (
              <div>
                <PrivateRoute notLoggedIn={userNotLoggedIn} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    userNotLoggedIn: authedUser === null,
    authedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
