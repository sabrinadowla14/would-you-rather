import React, { Component } from "react";
import { connect } from "react-redux";
//import { Link } from "react-router-dom";
//import Card from "react-bootstrap/Card";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
//import Button from "react-bootstrap/Button";
//import { formatDate } from "../utils/helpers";
import { formatQuestion } from "../utils/helpers";
//import Avatar from "./Avatar";
import { Card, CardBody, CardTitle } from "reactstrap";

class Question extends Component {
  render() {
    console.log(this.props);
    const {
      question,
      id,
      author,
      authedUser,
      avatarURL,
      users,
      user
    } = this.props;
    return (
      <div className="question">
        <Card>
          <CardBody>
            <CardTitle>{id} asks:</CardTitle>
            <div className="tile-left">
              <img alt="avatar" className="avatar" src={`/${id.avatarURL}`} />
              <h3>{id.name}</h3>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  return {
    question: questions[id],
    user: users[id],
    avatarURL: users[id.avatarURL],
    author: questions[id] ? users[questions.questions[id].author] : null,
    authedUser,
    id
  };
}

export default connect(mapStateToProps)(Question);
