import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import NavBar from "./NavBar";
import "../css/leaderboard.css";
import Avatar from "./Avatar";

function Leaderboard(props) {
  const { users, userScore } = props;
  return (
    <Fragment>
      <h2 className="text-center my-3">
        <b>LeaderBoard</b>
      </h2>
      <Container>
        <Row>
          <Col xs={6} md={3}>
            Users Images
          </Col>
          <Col xs={6} md={3}>
            Users Name
          </Col>
          <Col xs={6} md={3}>
            No of Questions Asked
          </Col>
          <Col xs={6} md={3}>
            Answered Questions
          </Col>
        </Row>
        {users.map((user, index) => (
          <Row key={user.id}>
            <Col xs={6} md={3}>
              <img
                src={users[user.id].avatarURL}
                className="avatar"
                alt={`Avatar of ${users[user.id].name}`}
              />
            </Col>
            <Col xs={6} md={3}>
              {user.name}
            </Col>
            <Col xs={6} md={3}>
              {user.quesCreated}
            </Col>
            <Col xs={6} md={3}>
              {user.quesAns}
            </Col>
          </Row>
        ))}
      </Container>
    </Fragment>
  );
}

const mapStateToProps = ({ users }) => {
  const userScore = uid => {
    return {
      uid,
      quesCreated: users[uid].questions.length,
      quesAns: Object.keys(users[uid].answers).length
    };
  };
  return {
    users: Object.values(users).sort(
      (a, b) => b.quesCreated + b.quesAns - (a.quesCreated + a.quesAns)
    ),

    userScore
  };
};

export default connect(mapStateToProps)(Leaderboard);
