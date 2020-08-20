import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeAuthedUser } from "../actions/authedUser";

class Logout extends Component {
  componentWillMount() {
    this.props.dispatch(removeAuthedUser());
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(Logout);
