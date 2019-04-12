import React, { Component, Fragment } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";
import {
  withStyles,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Grid
} from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";

const styles = theme => {
  console.log(theme);
  return {
    grow: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit
    },
    bigAvatar: {
      margin: theme.spacing.unit * 2,
      width: 100,
      height: 100,
      borderColor: theme.palette.primary[500],
      borderStyle: "solid",
      borderWidth: 3
    }
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    if (!props.location.state) {
      this.props.history.push(ROUTES.LANDING);
    }
    console.log(props.location.state);
  }
  render() {
    let { classes, history, location } = this.props;
    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton color="inherit" onClick={history.goBack}>
              <ArrowBackRounded />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Profile
            </Typography>
            <Button color="inherit" onClick={this.signout}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="column" justify="center" alignItems="center">
          <Avatar
            src={location.state.user.photoURL}
            className={classes.bigAvatar}
          />
          <Typography>{location.state.user.name}</Typography>
        </Grid>
      </Fragment>
    );
  }

  signout() {
    fire.auth().signOut();
    this.props.history.push(ROUTES.LANDING);
  }
}

export default withStyles(styles)(withRouter(Profile));
