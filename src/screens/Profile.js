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
  Typography
} from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";

const styles = theme => ({
  grow: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    if (!fire.auth().currentUser) {
      this.props.history.push(ROUTES.LANDING);
    }
    console.log(props.location);
  }
  render() {
    let { classes, history } = this.props;
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
      </Fragment>
    );
  }

  signout() {
    fire.auth().signOut();
    this.props.history.push(ROUTES.LANDING);
  }
}

export default withStyles(styles)(withRouter(Profile));
