import React, { Component } from "react";
// Material UI Imports
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
import fire from "../constants/config";
// React Router Imports
import { MAIN } from "../constants/routes";
// Local Imports
import PurrPollIcon from "../components/PurrPollIcon";

const styles = theme => ({
  root: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage: `url(https://farm6.static.flickr.com/5187/5635598426_caff56e4a8_b.jpg)`
  },
  title: {
    margin: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: 15,
    margin: 10,
    alignContent: "center"
  }
});

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={16}
          >
            <PurrPollIcon width="100" height="100" />
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="primary"
              className={classes.title}
            >
              Welcome to purrpoll
            </Typography>
            <Typography component="p" variant="body1" align="center">
              Sign in and get started
            </Typography>
            <Button
              className={classes.button}
              variant="contained"
              onClick={this.signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  async signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    try {
      let result,
        { credential } = await fire.auth().signInWithPopup(provider);
      this.props.history.push(MAIN);
      // let googleCredential = firebase.auth.GoogleAuthProvider.credential(
      //   credential.idToken,
      //   credential.accessToken
      // );
      //await fire.auth().signInAndRetrieveDataWithCredential(googleCredential);
      //let user = result.user;
      //console.log(user.email);
    } catch (error) {
      let errorCode = error.code,
        errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }
}

export default withStyles(styles)(Authentication);
