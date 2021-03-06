import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { withRouter } from "react-router";
class PageNotFound extends Component {
  render() {
    const { history } = this.props;

    return (
      <div className="text-center">
        <Card style={{ width: "45rem" }}>
          <CardHeader>Error msg:</CardHeader>
          <CardBody>
            <CardTitle>404: Page Not Found</CardTitle>
            <Button
              size="small"
              color="primary"
              onClick={() => history.push("/")}
            >
              Dashboard
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withRouter(PageNotFound);
