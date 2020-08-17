import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { handleInitialQuestions } from "../actions/shared";

class Dashboard extends Component {
  state = {
    chosenTab: "unanswered"
  };

  componentDidMount() {
    this.props.dispatch(handleInitialQuestions());
  }
  render() {
    console.log(this.props);
    const { userIds } = this.props;
    return (
      <div>
        <h3 className="center">Would You Rather?...</h3>
        <ul className="dashboard-list">
          {userIds.map(id => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users, loadingBar }) {
  const answeredQuestions = user =>
    Object.keys(user.answers).length.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
  return {
    unansweredQuestions: Object.keys(questions)
      .filter(qid => !answeredQuestions().includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),

    userIds: Object.keys(users).sort(
      (a, b) => users[b].timestamp - users[a].timestamp
    ),
    answeredQuestions
  };
}
export default connect(mapStateToProps)(Dashboard);
