import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//import { formatDate } from "../utils/helpers";
import { formatQuestion } from "../utils/helpers";
import Avatar from "./Avatar";

class Question extends Component {
  render() {
    const { question, questionSelected } = this.props;
    if (question === null) {
      return <p>We don't have this question.</p>;
    }
    const { name, id, avatar, optionOne, optionTwo, hasVoted } = question;

    if (questionSelected === "answered" && hasVoted !== true) {
      return false;
    }
    if (questionSelected === "unanswered" && hasVoted === true) {
      return false;
    }

    return (
      <Row className="text-center">
        <Col xs={12} md={6}>
          <Card bg="light" className="m-3">
            <Card.Header>
              <Avatar avatar={avatar} className="mr-2" />
              {name} asks Would You Rather ...:
            </Card.Header>
            <Card.Body className="text-center">
              <Card.Text>{optionOne.text}</Card.Text>
              <Link to={`/questions/${id}`}>
                <Button variant="outline-dark">View Question</Button>
              </Link>
              <Card.Text>{optionTwo.text}</Card.Text>
              <Link to={`/question/${id}/results}`}>
                <Button variant="outline-dark">View Question</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(
  { login, users, questions },
  { id, questionSelected }
) {
  const question = questions[id];

  return {
    //authedUser: login.loggedInUser.id,
    question: formatQuestion(
      question,

      users[question.author],

      //login.loggedInUser.id,
      questionSelected
    )
  };
}

export default connect(mapStateToProps)(Question);
