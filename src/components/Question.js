import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { withRouter } from "react-router-dom";
//import { VotesDetails } from "./VotesDetails";

class Question extends Component {
  constuctor() {
    this.quesInfo = this.routeChange.bind(this);
  }
  quesInfo(e, id) {
    let path = `/questions/` + id;
    this.props.history.push(path);
  }
  render() {
    const { question, authUser, id } = this.props;
    return (
      <Card onClick={e => this.quesInfo(e, id)}>
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
    authUser: state.authedUser,
    id
  };
}

export default withRouter(connect(mapStateToProps)(Question));
