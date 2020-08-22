import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    location: false
  };

  handleOptionOneChange = e => {
    e.preventDefault();
    this.setState({
      optionOne: e.target.value
    });
  };

  handleOptionTwoChange = e => {
    e.preventDefault();
    this.setState({
      optionTwo: e.target.value
    });
  };

  handleOptionSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.saveQuestion(optionOne, optionTwo);
    this.setState({
      optionOne: "",
      optionTwo: "",
      location: true
    });
  };

  render() {
    if (this.state.location) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              <Form onSubmit={this.handleOptionSubmit}>
                <FormGroup>
                  <Label for="optionOne">Option One</Label>
                  <Input
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleOptionOneChange}
                    placeholder="Option One"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="optionTwo">Option Two</Label>
                  <Input
                    type="text"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={this.handleOptionTwoChange}
                    placeholder="Option Two"
                  />
                </FormGroup>
                <Button disabled={optionOne === "" || optionTwo === ""}>
                  Submit Option
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  };
}

export default connect(null, mapDispatchToProps)(NewQuestion);
