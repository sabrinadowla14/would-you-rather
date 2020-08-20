import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { withRouter } from "react-router-dom";

class Question extends Component {
  constuctor() {
    this.quesInfo = this.routeChange.bind(this);
  }
  quesInfo(e, qId) {
    let path = `/questions/` + qId;
    this.props.history.push(path);
  }
  render() {
    const { question, authUser } = this.props;
    return (
      <Card onClick={e => this.quesInfo(e, question.id)}>
        <CardBody>
          <CardTitle>Would You Rather</CardTitle>
          <ul>
            <li
              className={
                question.optionOne.votes.includes(authUser)
                  ? "optionSelected"
                  : ""
              }
            >
              {question.optionOne.text}
            </li>
            <li
              className={
                question.optionTwo.votes.includes(authUser)
                  ? "optionSelected"
                  : ""
              }
            >
              {question.optionTwo.text}
            </li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state, { id }) {
  return {
    question: state.questions[id],
    authUser: state.authedUser
  };
}

export default withRouter(connect(mapStateToProps)(Question));
