import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import Question from "./Question";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";

class Dashboard extends Component {
  state = {
    activeTab: "1"
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { unansQuesIds, ansQuesIds } = this.props;
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
              {unansQuesIds.map(qid => (
                <Col key={qid} sm="6" md="4">
                  <Question id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {ansQuesIds.map(qid => (
                <Col key={qid} sm="6" md="4">
                  <Question id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
        </TabContent>
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
