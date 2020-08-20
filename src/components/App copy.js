import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD:src/components/App copy.js

=======
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
>>>>>>> 20fdc773e5a90afce51a88c20192af743a6452f8:src/components/App.js
=======
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
>>>>>>> 20fdc773e5a90afce51a88c20192af743a6452f8
import { handleInitialData } from "../actions/shared";
import Routes from "./Routes";
import NavBar from "./NavBar";

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { notLoggedIn } = this.props;

    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <NavBar />
            <Routes notLoggedIn={notLoggedIn} />
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
    notLoggedIn: authedUser === null
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
