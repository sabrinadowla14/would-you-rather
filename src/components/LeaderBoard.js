import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import NavBar from "./NavBar";
import "../css/leaderboard.css";

function Leaderboard(props) {
  const { users } = props;
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
                src={user.avatarURL}
                className="avatar"
                alt={`Avatar of ${user.name}`}
              />
            </Col>
            <Col xs={6} md={3}>
              {user.name}
            </Col>
            <Col xs={6} md={3}>
              {user.questions.length}
            </Col>
            <Col xs={6} md={3}>
              {Object.keys(user.answers).length}
            </Col>
          </Row>
        ))}
      </Container>
    </Fragment>
  );
}

const mapStateToProps = ({ users }) => {
  const userScore = user =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
  };
};

export default connect(mapStateToProps)(Leaderboard);
