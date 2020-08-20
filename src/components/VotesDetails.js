import React, { PureComponent } from "react";
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

class VotesDetails extends PureComponent {
  state = {
    optionChosen: ""
  };

  radioSelected = e => {
    this.setState({
      optionChosen: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.quesAnsSaved(this.state.optionChosen);
  };

  render() {
    const {
      question,
      authorQ,
      answer,
      totalVLength,
      perOne,
      perTwo
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
                  <div className="progress">
                    <div
                      className="progress-one"
                      style={{ width: `${perOne}%` }}
                    >{`${perOne}%`}</div>
                    <div
                      className="progress-two"
                      style={{ width: `${perTwo}%` }}
                    >{`${perTwo}%`}</div>
                  </div>
                  <div className="totalVLength">
                    Total number of votes: {totalVLength}
                  </div>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionOne"
                          onChange={this.radioSelected}
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="myRadios"
                          value="optionTwo"
                          onChange={this.radioSelected}
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

function calculation(y) {
  return Number.parseFloat(y).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  let perOne, perTwo, totalVLength, answer;
  const user = users[authedUser];
  const answers = authedUser ? users[authedUser].answers : [];

  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(questions[id].id)) {
    answer = answers[questions[id].id];
  }
  const authorQ = users[questions[id].author];
  totalVLength =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  perOne = calculation(
    (questions[id].optionOne.votes.length / totalVLength) * 100
  );
  perTwo = calculation(
    (questions[id].optionTwo.votes.length / totalVLength) * 100
  );
  return {
    question,
    authorQ,
    answer,
    totalVLength,
    perOne,
    perTwo
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
