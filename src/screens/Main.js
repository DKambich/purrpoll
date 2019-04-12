import React, { Component, Fragment } from "react";
// Material UI Imports
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
// React Router Imports
import { LANDING, PROFILE } from "../constants/routes";

const styles = {
  grow: {
    flexGrow: 1
  },
  avatar: {
    height: 26,
    width: 26
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.navigateToProfile = this.navigateToProfile.bind(this);
    
    // If the user does not come from another page...
    if (!props.location.state) {
      // Navigate to the landing page
      this.props.history.push(LANDING);
    }

    this.state = {
      user: props.location.state.user
    };
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
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
              <IconButton color="inherit" onClick={this.navigateToProfile}>
                <Avatar className={classes.avatar} src={user.photoURL} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }

  navigateToProfile() {
    this.props.history.push({
      pathname: PROFILE,
      state: { user: this.state.user }
    });
  }
}

export default withStyles(styles)(Main);
