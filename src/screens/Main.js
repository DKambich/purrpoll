import React, { Component, Fragment } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

class Main extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    if (!fire.auth().currentUser) {
      this.props.history.push(ROUTES.LANDING);
    }
  }
  render() {
    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              purrpoll
            </Typography>
          </Toolbar>
        </AppBar>
        <Button variant="contained" onClick={this.signout}>
          Logout
        </Button>
      </Fragment>
    );
  }

  signout() {
    fire.auth().signOut();
    this.props.history.push(ROUTES.LANDING);
  }
}

export default Main;
