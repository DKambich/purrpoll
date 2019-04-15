import React, { Component } from "react";
// Material UI Imports
import {
  AppBar,
  Avatar,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  Grid
} from "@material-ui/core";
// React Router Imports
import { LANDING, PROFILE } from "../constants/routes";

import CatIcon from "../components/CatIcon";

import SwipeableViews from "react-swipeable-views";

const styles = theme => {
  return {
    root: {},
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
    },
    slide: {
      padding: 15,
      minHeight: 100,
      color: "#fff"
    },
    slide1: {
      backgroundColor: "#FEA900"
    },
    slide2: {
      backgroundColor: "#B3DC4A"
    },
    slide3: {
      backgroundColor: "#6AC0FF"
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

    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.setTab = this.setTab.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <CatIcon className={classes.logo} />
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
        <SwipeableViews
          enableMouseEvents
          onChangeIndex={this.handleChangeIndex}
          index={this.state.selectedTab}
        >
          <div
            style={{
              padding: 15,
              minHeight: "88vh",
              color: "#fff",
              backgroundColor: "#FEA900"
            }}
          >
            slide n°1
          </div>
          <div
            style={{
              padding: 15,
              minHeight: 100,
              color: "#fff",
              backgroundColor: "#B3DC4A"
            }}
          >
            slide n°2
          </div>
        </SwipeableViews>
      </div>
    );
  }

  navigateToProfile() {
    this.props.history.push({
      pathname: PROFILE,
      state: { user: this.state.user }
    });
  }

  setTab(event, value) {
    this.handleChangeIndex(value);
  }

  handleChangeIndex(index) {
    this.setState({ selectedTab: index });
  }
}

export default withStyles(styles)(Main);
