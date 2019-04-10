import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

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
    padding: 25,
    alignContent: "center"
  }
});

class Authentication extends Component {
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
              color="primary"
              className={classes.title}
            >
              Welcome to purrpoll
            </Typography>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              color="inherit"
            >
              Sign In
            </Typography>
            <Button className={classes.button} variant="contained">
              Sign in with Google
            </Button>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Authentication);
