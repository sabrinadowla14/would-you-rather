import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { VotesDetails } from "./VotesDetails";

class Question extends Component {
  constuctor() {
    this.quesInfo = this.quesInfo.bind(this);
  }
  quesInfo(e, question_id) {
    let path = `/questions/` + question_id;
    this.props.history.push(path);
  }
  render() {
    const { question, authUser, question_id } = this.props;
    return (
      <Card onClick={e => this.quesInfo(e, question_id)}>
        <CardBody>
          <CardTitle>Would You Rather?...</CardTitle>
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
          <div className="path-info">
            <Link to={`/question/${question_id}`}>
              <button className="btnVote">Vote Please</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state, { id }) {
  const question = state.questions[id];
  return {
    question_id: state.questions[id].id,
    authUser: state.authedUser,
    question
  };
}

export default withRouter(connect(mapStateToProps)(Question));
