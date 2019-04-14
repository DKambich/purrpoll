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
  withStyles,
  Grid
} from "@material-ui/core";
// React Router Imports
import { LANDING, PROFILE } from "../constants/routes";

import CatIcon from "../components/CatIcon";
import CatLoading from "../components/CatLoading";

import SwipeableViews from "react-swipeable-views";

const styles = theme => {
  console.log(theme);
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: "100vw"
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

    this.navigateToProfile = this.navigateToProfile.bind(this);
    this.setTab = this.setTab.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary" style={{ flex: 0 }}>
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
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ flex: 1 }}
        >
          <CatLoading />

          <CatLoading />
        </Grid>
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
