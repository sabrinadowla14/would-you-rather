import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";

class User extends PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <img
          src={user.avatarURL}
          className="avatar"
          alt={`Avatar of ${user.name}`}
        />
        <span>{user.name}</span>
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
