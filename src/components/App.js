import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import "../App.css";
import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { userNotLoggedIn } = this.props;

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
