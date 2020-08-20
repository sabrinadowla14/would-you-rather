import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Routes from "./PrivateRoute";
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
    const { notLoggedIn, authedUser } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <NavBar />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/home" component={Dashboard} />
                <PrivateRoute
                  path="/question/:question_id"
                  component={Question}
                />
                <PrivateRoute path="/add" component={NewQuestion} />
                <PrivateRoute path="/leaderboard" component={Leaderboard} />
              </div>
            )}{" "}
            : {!authedUser ? <Login /> : <PrivateRoute />}
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  notLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null,
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
