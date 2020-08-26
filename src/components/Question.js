import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { VotesDetails } from "./VotesDetails";
import "../css/question.css";
import PageNotFound from "./PageNotFound";
import User from "./User";

class Question extends Component {
  constuctor() {
    this.quesInfo = this.quesInfo.bind(this);
  }
  quesInfo(e, question_id) {
    let path = `/questions/` + question_id;
    this.props.history.push(path);
  }
  render() {
    const { question, authedUser, question_id, authorQ, id } = this.props;
    if (question === null) {
      return <PageNotFound />;
    }
    return (
      <Card onClick={e => this.quesInfo(e, question_id)}>
        <CardBody>
          <CardTitle>Would You Rather?...</CardTitle>
          <ul>
            <li
              className={
                question.optionOne.votes.includes(authedUser) ? "optSel" : ""
              }
            >
              <User id={authorQ.id} />
              {question.optionOne.text}
            </li>
            <li
              className={
                question.optionTwo.votes.includes(authedUser) ? "optSel" : ""
              }
            >
              {question.optionTwo.text}
            </li>
          </ul>
          <div className="path-info">
            <button className="btnVote">View Questions</button>
          </div>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state, { id }) {
  const question = state.questions[id];
  const user = state.users[state.users[state.authedUser]];
  const authorQ = state.users[state.questions[id].author];
  return {
    question_id: state.questions[id].id,
    authedUser: state.authedUser,
    question,
    authorQ,
    id
  };
}

export default withRouter(connect(mapStateToProps)(Question));
