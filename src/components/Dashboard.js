import React, { Component } from "react";
import Question from "./Question";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class DashBoard extends Component {
  state = {
    questionSelected: "unanswered",
    activeTab: "1"
  };

  toggle(e, tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        questionSelected: tab,
        activeTab: tab
      });
    }
  }

  render() {
    const { qid } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {qid.map(qid => (
                <Col key={qid} sm="6" md="4">
                  <Question
                    id={qid}
                    questionSelected={this.state.questionSelected}
                  />
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {qid.map(qid => (
                <Col key={qid} sm="6" md="4">
                  <Question
                    id={qid}
                    questionSelected={this.state.questionSelected}
                  />
                </Col>
              ))}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array
};

function mapStateToProps({ questions }) {
  return {
    qid: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(DashBoard);
