import React, { Component } from "react";
import { Label, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    userId: ""
  };

  handleChange = e => {
    const userId = e.target.value;
    this.setState(() => ({
      userId
    }));
  };

  handleSubmitBtn = e => {
    const { userId } = this.state;

    const { authedUser } = this.props;

    if (userId) {
      authedUser(userId);
    }
    e.preventDefault();
  };

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    if (this.props.authedUser === true) {
      return <Redirect to={`/questions/${this.props.id}`} />;
    }
    return (
      <Row>
        <Col sm="6" md={{ size: 4, offset: 5 }}>
          <form id="Login" onSubmit={this.handleSubmitBtn}>
                            
            <div className="form-group">
              <h3>Welcome to Would you Rather</h3>
              <Label for="selectUserOpt">Drop-Down to select User:</Label>
                                
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
              className="btn btn-primary"
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
    authedUser: id => {
      dispatch(setAuthedUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
