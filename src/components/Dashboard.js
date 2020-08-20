import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "./Question";

class Dashboard extends Component {
  state = {
    answered: false
  };

  handleChangeAnswered = (e, answered) => {
    e.preventDefault();

    this.setState(() => ({
      answered
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
        {this.state.answered === true ? (
          <h3 className="center">Answered Questions</h3>
        ) : (
          <h3 className="center">Unanswered Questions</h3>
        )}
        <div className="btn-list-group">
          <button className="btn" onClick={e => this.toggleAnswered(e, false)}>
            Unanswered
          </button>
          <button className="btn" onClick={e => this.toggleAnswered(e, true)}>
            Answered
          </button>
        </div>
        <ul>
          {this.state.answered
            ? this.props.answeredQuestions.map(id => (
                <li key={id}>
                  <Question id={id} />
                </li>
              ))
            : this.props.unansweredQuestions.map(id => (
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

<<<<<<< HEAD
  const answeredQuestions = Object.keys(users[authedUser].answers).sort(
=======
  const answeredQuestions = Object.keys(user.answers).sort(
>>>>>>> 20fdc773e5a90afce51a88c20192af743a6452f8
    (a, b) => user.answers[b].timestamp - user.answers[a].timestamp
  );
  return {
    unansweredQuestions: Object.keys(questions)
<<<<<<< HEAD
      .filter(id => !answeredQuestions.includes(id))
=======
      .filter(qid => !answeredQuestions.includes(qid))
>>>>>>> 20fdc773e5a90afce51a88c20192af743a6452f8
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions
  };
}
export default connect(mapStateToProps)(Dashboard);
