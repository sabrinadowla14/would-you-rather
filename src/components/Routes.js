import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import QuestionDetails from "./QuestionDetails";
import PageNotFound from "./PageNotFound";
import Logout from "./Logout";
import Navbar from "./NavBar";

function Routes(props) {
  return (
    <div className="container">
      <Switch>
        {props.notLoggedIn ? (
          <Route path="/" exact component={Login} />
        ) : (
          <Fragment>
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" exact component={LeaderBoard} />
            <Route path="/add" component={NewQuestion} />
            <Route path="/questions/:id" component={QuestionDetails} />
            <Route exact path="/logout" component={Logout} />
          </Fragment>
        )}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

Routes.propTypes = { notLoggedIn: PropTypes.any };

export default Routes;
