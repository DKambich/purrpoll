import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  withStyles,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent
} from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
// Firebase Imports
import fire from "../constants/config";
// React Router Imports
import { withRouter } from "react-router-dom";
import { LANDING } from "../constants/routes";

const styles = theme => {
  return {
    grow: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit
    },
    bigAvatar: {
      borderColor: theme.palette.primary[500],
      borderStyle: "solid",
      borderWidth: 3,
      height: 150,
      margin: theme.spacing.unit * 2,
      width: 150
    }
  };
};

const testArr = new Array(51).fill(0);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    if (!props.location.state) {
      this.props.history.push(LANDING);
    }
    console.log(props.location.state);
  }
  render() {
    const { classes, history, location, theme } = this.props;
    const { user } = location.state;
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
          <Avatar src={user.photoURL} className={classes.bigAvatar} />
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="h4">Your Voted Cats</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          {testArr.map((element, index) => (
            <Card
              style={{
                display: "inline-block",
                width: 250,
                margin: theme.spacing.unit * 3
              }}
            >
              <CardContent>{index}</CardContent>
            </Card>
          ))}
        </Grid>
      </Fragment>
    );
  }

  signout() {
    fire.auth().signOut();
    this.props.history.push(LANDING);
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Profile));
