import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  AppBar,
  Avatar,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
// React Router Imports
import { LANDING, PROFILE } from "../constants/routes";
import CatLoading from "../components/CatLoading";
import meow from "../assets/meow.mp3";

import CatIcon from "../components/CatIcon";

import CatRating from "../components/CatRating";

const styles = theme => {
  return {
    grow: {
      flexGrow: 1
    },
    logo: {
      marginRight: theme.spacing.unit,
      [theme.breakpoints.down("sm")]: {
        fontSize: 32
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: 40
      }
    }
  };
};

class Main extends Component {
  constructor(props) {
    super(props);

    // If the user does not come from another page...
    if (!props.location.state) {
      // Navigate to the landing page
      this.props.history.push(LANDING);
    }

    this.state = {
      user: props.location.state.user,
      selectedTab: 0
    };

    this.audio = new Audio(meow);
    this.playSecret = this.playSecret.bind(this);

    this.navigateToProfile = this.navigateToProfile.bind(this);

    this.setTab = this.setTab.bind(this);
  }

  render() {
    const { classes } = this.props,
      { user } = this.state;

    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <CatIcon className={classes.logo} onClick={this.playSecret} />
            <Typography variant="h6" color="inherit" className={classes.grow}>
              purrpoll
            </Typography>

            <Tooltip title="Profile">
              <Avatar src={user.photoURL} onClick={this.navigateToProfile} />
            </Tooltip>
          </Toolbar>

          <Tabs
            value={this.state.selectedTab}
            onChange={this.setTab}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab label="POLLS" />
            <Tab label="TRENDING" />
          </Tabs>
        </AppBar>

        {this.state.selectedTab === 0 && (
          <CatRating user={this.props.history.location.state.user} />
        )}
        {this.state.selectedTab === 1 && <CatLoading />}
      </Fragment>
    );
  }

  playSecret() {
    this.audio.play();
  }

  navigateToProfile() {
    this.props.history.push({
      pathname: PROFILE,
      state: { user: this.state.user }
    });
  }

  setTab(event, value) {
    this.setState({ selectedTab: value });
  }
}

export default withStyles(styles, { withTheme: true })(Main);
