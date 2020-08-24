import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import User from "./User";
import { handleAddQuestionAnswer } from "../actions/shared";
import "../css/voteDetails.css";
import PageNotFound from "./PageNotFound";

class VotesDetails extends Component {
  state = {
    optionChosen: ""
  };

  setVoteOption = e => {
    this.setState({
      optionChosen: e.target.value
    });
  };

  handleSaveSubmit = e => {
    e.preventDefault();
    this.props.quesAnsSaved(this.state.optionChosen);
  };

  render() {
    const {
      question,
      authorQ,
      answer,
      totalVLength,
      calOptOne,
      calOptTwo
    } = this.props;
    const { optionChosen } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardHeader>
              <User id={authorQ.id} />
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              {answer ? (
                <div>
                  <FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          checked={answer === "optionOne"}
                          readOnly
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <Label check>
                        <Input
                          type="radio"
                          checked={answer === "optionTwo"}
                          readOnly
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <div className="prog-bar">
                    <div
                      className="prog-one"
                      style={{
                        width: `${calOptOne}%`
                      }}
                    >{`${calOptOne}%`}</div>
                    <div
                      className="prog-two"
                      style={{
                        width: `${calOptTwo}%`
                      }}
                    >{`${calOptTwo}%`}</div>
                  </div>
                  <div className="totalVLength">
                    Total Votes: {totalVLength}
                  </div>
                </div>
              ) : (
                <Form onSubmit={this.handleSaveSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="opt-radio"
                          value="optionOne"
                          onChange={this.setVoteOption}
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="opt-radio"
                          value="optionTwo"
                          onChange={this.setVoteOption}
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={optionChosen === ""}>Submit</Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  let perOne, perTwo, totalVLength, answer;
  const user = users[authedUser];
  const answers = authedUser ? users[authedUser].answers : [];

  const { id } = match.params;
  const question = questions[id];
  if (user.answers.hasOwnProperty(questions[id].id)) {
    answer = user.answers[question.id];
  }
  const authorQ = users[questions[id].author];
  totalVLength =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const quesOneVotesLen =
    (questions[id].optionOne.votes.length / totalVLength) * 100;
  const calOptOne = Math.round(quesOneVotesLen);
  const quesTwoVotesLen =
    (questions[id].optionTwo.votes.length / totalVLength) * 100;
  const calOptTwo = Math.round(quesTwoVotesLen);

  return {
    question,
    authorQ,
    answer,
    totalVLength,
    calOptOne,
    calOptTwo,
    id
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;

  return {
    quesAnsSaved: ans => {
      dispatch(handleAddQuestionAnswer(id, ans));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VotesDetails);
