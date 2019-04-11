import React, { Component, Fragment } from "react";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  withStyles
} from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    // width: 32,
    // height: 32
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    // If the user is being routed from a different page
    if (!props.location.state) {
      this.props.history.push(ROUTES.LANDING);
    }
    this.state = {
      avatarURL: props.location.state.user.photoURL
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              purrpoll
            </Typography>
            <IconButton
              onClick={() => {
                this.props.history.push({
                  pathname: ROUTES.PROFILE,
                  state: { test: "TEST" }
                });
              }}
            >
              <Avatar className={classes.avatar} src={this.state.avatarURL} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Main));
