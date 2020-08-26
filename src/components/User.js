import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

class User extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <Container>
          <Row>
            <Col xs={6} md={3}>
              <img
                src={user.avatarURL}
                className="avatar"
                alt={`Avatar of ${user.name}`}
              />
            </Col>
            <Col
              xs={8}
              md={4}
              style={{ color: "blue", textDecoration: "none" }}
            >
              <p className="userName">{user.name} Asks: </p>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  };
}

export default connect(mapStateToProps)(User);
