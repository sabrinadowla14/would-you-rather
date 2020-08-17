import React from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/shared";
import Avatar from "./Avatar";

class Question extends React.Component {
  state = {
    answered: false
  };

  toggleAnswered = (e, answered) => {
    e.preventDefault();

    this.setState(() => ({
      answered
    }));
  };
  render() {
    const { question, id, author, authedUser } = this.props;

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
        <div className="question">
          <Card>
            <CardBody>
              <CardTitle>{} asks:</CardTitle>
              <div className="tile-left">
                {/* <img
                alt="avatar"
                className="avatar"
                src={`/${}`}
             /> */}
              </div>
              <div className="question-body">
                <ul>
                  <li className="center">{question.optionOne.text}</li>
                  <div className="divider">
                    <p className="center">OR</p>
                  </div>
                  <li className="center">{question.optionTwo.text}</li>
                </ul>
                <button className="btn-default">View</button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { qid }) {
  return {
    question: questions[qid],
    avatarURL: users[qid.avatarURL],
    //author: questions[qid] ? users[questions.questions[qid].author] : null,
    authedUser,
    id: qid
  };
}

export default connect(mapStateToProps, null)(Question);
