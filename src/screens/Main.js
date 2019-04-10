import React, { Component } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

class Main extends Component {
  constructor(props) {
    super(props);
    if (!fire.auth().currentUser) {
      this.props.history.push(ROUTES.LANDING);
    }
  }
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Main;
