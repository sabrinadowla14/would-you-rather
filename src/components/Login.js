import React, { Component } from "react";
import { Label, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import "../css/login.css";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    userId: "",
    errMsg: ""
  };

  handleChange = e => {
    const userId = e.target.value;
    this.setState(() => ({
      userId
    }));
  };

  handleSubmitBtn = e => {
    const { userId, errMsg } = this.state;

    const { selectAuthedUser } = this.props;

    if (userId) {
      selectAuthedUser(userId);
    } else {
      this.setState({ errMsg: "Please select a User!!" });
    }

    e.preventDefault();
  };

  render() {
    const { users } = this.props;
    const { errMsg } = this.state;

    if (this.props.selectAuthedUser === true) {
      return <Redirect to={`/questions/${this.state.userId}`} />;
    }
    return (
      <Row>
        <Col sm="8" md={{ size: 4, offset: 4 }}>
          <form id="login-info" onSubmit={this.handleSubmitBtn}>
                            
            <div className="form-group">
              <h3>Welcome to Would you Rather</h3>
              <Label for="selectUserOpt">Drop-Down to select User:</Label>
                {errMsg ? <p className="text-danger">{errMsg}</p> : null}
                              
              <select
                className="form-control"
                id="userId"
                onChange={e => this.handleChange(e)}
              >
                <option value="">Please Select User</option>{" "}
                                    
                {Object.keys(this.props.users).map(user => {
                  return (
                    <option key={users[user].id} value={users[user].id}>
                                                {users[user].name}
                    </option>
                  );
                })}
                                  
              </select>
                              
            </div>
                            
            <button
              type="submit"
              id="loginBtn"
              disabled={this.state.userId === ""}
            >
                                Login                 
            </button>
                          
          </form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectAuthedUser: id => {
      dispatch(setAuthedUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
