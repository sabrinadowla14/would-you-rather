import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "./Question";

class Dashboard extends Component {
  state = {
    quesAns: false
  };

  handleChangeQAnswered = (e, quesAns) => {
    e.preventDefault();

    this.setState(() => ({
      quesAns
    }));
  };

  render() {
    if (!this.props.authedUser) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              returnPath: "/"
            }
          }}
        />
      );
    }

    return (
      <div className="questions-list">
        {this.state.quesAns === true ? (
          <h3 className="center">Answered Questions</h3>
        ) : (
          <h3 className="center">Unanswered Questions</h3>
        )}
        <div className="btn-list-group">
          <button
            className="btn"
            onClick={e => this.handleChangeQAnswered(e, false)}
          >
            Unanswered
          </button>
          <button
            className="btn"
            onClick={e => this.handleChangeQAnswered(e, true)}
          >
            Answered
          </button>
        </div>
        <ul>
          {this.state.quesAns
            ? this.props.ansQuesIds.map(id => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))
            : this.props.unansQuesIds.map(id => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];

  const ansQuesIds = authedUser
    ? Object.keys(users[authedUser].answers).sort(
        (a, b) =>
          users[authedUser].answers[b].timestamp -
          users[authedUser].answers[a].timestamp
      )
    : [];
  return {
    unansQuesIds: Object.keys(questions)
      .filter(qid => !ansQuesIds.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    ansQuesIds
  };
}
export default connect(mapStateToProps)(Dashboard);
