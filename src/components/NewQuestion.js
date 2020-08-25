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
    oriLocation: false
  };

  handleInputOptChange = e => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleOptionSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.saveQuestion(optionOne, optionTwo);
    this.setState({
      optionOne: "",
      optionTwo: "",
      oriLocation: true
    });
  };

  render() {
    if (this.state.oriLocation) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <CardTitle style={{ color: "blue", textDecoration: "none" }}>
                Would You Rather?...
              </CardTitle>
              <Form onSubmit={this.handleOptionSubmit}>
                <FormGroup>
                  <Label for="optionOne">Option One</Label>
                  <Input
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleInputOptChange}
                    placeholder="Option One"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="optionTwo">Option Two</Label>
                  <Input
                    type="text"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={this.handleInputOptChange}
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
