import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import NavBar from "./NavBar";
function Leaderboard(props) {
  const { users } = props;
  return (
    <Fragment>
      <NavBar />
      <Table>
        <thead className="userInfo">
          <tr className="userInfo">
            <th>User Id</th>
            <th>Users Images</th>
            <th>Users Name</th>
            <th>No of Questions Asked</th>
            <th>Answered Questions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={user.avatarURL}
                  className="avatar"
                  alt={`Avatar of ${user.name}`}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.questions.length}</td>
              <td>{Object.keys(user.answers).length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
