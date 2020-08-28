import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import NavBar from "./NavBar";
import "../css/leaderboard.css";
import Avatar from "./Avatar";

function Leaderboard(props) {
  const { users, userInfo } = props;
  return (
    <Fragment>
      <h2 className="text-center my-3">
        <b>LeaderBoard</b>
      </h2>
      <Container>
        <Row>
          <Col xs={6} md={3}>
            Users Images
          </Col>
          <Col xs={6} md={3}>
            Users Name
          </Col>
          <Col xs={6} md={3}>
            No of Questions Asked
          </Col>
          <Col xs={6} md={3}>
            Answered Questions
          </Col>
        </Row>
        {userInfo.map(user => (
          <Row key={user.id}>
            <Col xs={6} md={3}>
              <img
                src={user.avatar}
                className="avatar"
                alt={`Avatar of ${user.name}`}
              />
            </Col>
            <Col xs={6} md={3}>
              {user.name}
            </Col>
            <Col xs={6} md={3}>
              {user.noOfQueCnt}
            </Col>
            <Col xs={6} md={3}>
              {user.noOfAnsCnt}
            </Col>
          </Row>
        ))}
      </Container>
    </Fragment>
  );
}

function mapStateToProps({ users }) {
  const userInfo = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      noOfAnsCnt: Object.values(user.answers).length,
      noOfQueCnt: user.questions.length,
      totalScore: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return {
    userInfo
  };
}

export default connect(mapStateToProps)(Leaderboard);
