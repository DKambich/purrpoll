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
import CatLoading from "../components/CatLoading";
import meow from "../assets/meow.mp3";

import CatIcon from "../components/CatIcon";

import SwipeableViews from "react-swipeable-views";

const styles = theme => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    },
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
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  render() {
    const { classes, theme } = this.props;
    const { user } = this.state;
    return (
      <div className={classes.root}>
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
        <SwipeableViews
          enableMouseEvents
          style={{ flex: 1 }}
          onChangeIndex={this.handleChangeIndex}
          index={this.state.selectedTab}
        >
          <div
            style={{
              minHeight: "100%"
            }}
          >
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <div style={{ marginTop: theme.spacing.unit * 4 }}>
                <CatLoading />
              </div>
            </Grid>
          </div>
          <div
            style={{
              minHeight: "100%"
            }}
          >
            <Typography variant="h1">
              HERE IS A LOT OF DANK TEXT LMAO
            </Typography>
          </div>
        </SwipeableViews>
      </div>
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
    this.handleChangeIndex(value);
  }

  handleChangeIndex(index) {
    this.setState({ selectedTab: index });
  }
}

export default withStyles(styles, { withTheme: true })(Main);
