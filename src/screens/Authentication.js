import React, { Component } from "react";
// Material UI Imports
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
import fire from "../constants/config";
// React Router Imports
import { LANDING } from "../constants/routes";
// Local Imports
import CatIcon from "../components/CatIcon";

const styles = theme => ({
  root: {
    backgroundImage: `url(https://farm6.static.flickr.com/5187/5635598426_caff56e4a8_b.jpg)`,
    backgroundSize: "cover",
    height: "100vh"
  },
  paper: {
    alignContent: "center",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 1.5
  },
  catLogo: {
    fontSize: 300
  },
  title: {
    margin: theme.spacing.unit * 2
  },
  googleButton: {
    background: "#FFF",
    color: "black",
    margin: theme.spacing.unit,
    "&:hover": { background: "#EEE" }
  },
  googleIcon: {
    marginRight: theme.spacing.unit
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
            <CatIcon color="primary" className={classes.catLogo} />
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
              className={classes.googleButton}
              variant="contained"
              onClick={this.signInWithGoogle}
            >
              <img
                className={classes.googleIcon}
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google Logo"
                width={20}
                height={20}
              />
              Sign in with Google
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  async signInWithGoogle() {
    // Create a Google Authentication Provider
    let provider = new firebase.auth.GoogleAuthProvider();
    try {
      // Display a Google sign in popup
      await fire.auth().signInWithPopup(provider);
      // Navigate to the landing page once signed in
      this.props.history.push(LANDING);
    } catch (error) {
      // Log errors that come from the popup
      let errorCode = error.code,
        errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  }
}

export default withStyles(styles)(Authentication);
