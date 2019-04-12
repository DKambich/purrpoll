import React, { Component, Fragment } from "react";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  withStyles,
  Tooltip
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  avatar: {
    width: 26,
    height: 26
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
      user: props.location.state.user,
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
            <Tooltip title="Upload Cat" aria-label="Upload Cat">
              <IconButton color="inherit">
                <CloudUpload />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile" aria-label="Profile">
              <IconButton
                color="inherit"
                onClick={() => {
                  this.props.history.push({
                    pathname: ROUTES.PROFILE,
                    state: { user: this.state.user }
                  });
                }}
              >
                <Avatar className={classes.avatar} src={this.state.avatarURL} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(Main));
