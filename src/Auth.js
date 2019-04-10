import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/auth";

import fire from "./config";

const styles = theme => ({
  root: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage: `url(https://wallpaperplay.com/walls/full/2/0/c/72433.jpg)`
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
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="primary"
              className={classes.title}
            >
              Welcome to purrpoll
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

  signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.email);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }
}

export default withStyles(styles)(Authentication);
