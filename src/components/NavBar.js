import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component, Fragment } from "react";
import User from "./User";
import "../css/navbar.css";

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        <Navbar bg="primary" variant="dark" light expand="md">
          <NavbarBrand
            style={{ color: "maroon", textDecoration: "none" }}
            tag={Link}
            to="/"
          >
            Back To Home!!
          </NavbarBrand>
          {authedUser && (
            <Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink
                      style={{ color: "blue", textDecoration: "none" }}
                      tag={Link}
                      to="/add"
                    >
                      New Question
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "blue", textDecoration: "none" }}
                      tag={Link}
                      to="/leaderboard"
                    >
                      LeaderBoard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <User id={authedUser} />
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: "blue", textDecoration: "none" }}
                      tag={Link}
                      to="/logout"
                      onClick={this.props.handleLogout}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Fragment>
          )}
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps, null)(NavBar));
