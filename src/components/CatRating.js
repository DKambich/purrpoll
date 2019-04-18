import React, { Component } from "react";

import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Paper,
  Button
} from "@material-ui/core";
import CatLoading from "./CatLoading";

const styles = theme => {
  return {
    loadingIcon: {
      marginTop: theme.spacing.unit * 4
    },
    mainCard: {
      marginTop: theme.spacing.unit * 8
    },
    votingCard: {
      padding: theme.spacing.unit * 4
    },
    media: {
      width: 300,
      height: 300,
      objectFit: "cover"
    }
  };
};

class CatRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      mounted: true
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.loadingIcon}
        >
          <CatLoading />
        </Grid>
      );
    }

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classes.mainCard}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">catA</Typography>
          </CardContent>
          <CardMedia src="https://cdn2.thecatapi.com/images/5vk.jpg">
            <img
              className={classes.media}
              alt="CatPicture"
              src="https://cdn2.thecatapi.com/images/5vk.jpg"
            />
          </CardMedia>
        </Card>

        <Paper className={classes.votingCard}>
          <Grid container direction="column">
            <Typography variant="h4" align="center">
              Choose your favorite!
            </Typography>
            <Grid container justify="space-evenly">
              <Button variant="contained">Vote for Cat A</Button>
              <Button variant="contained" disabled>
                Vote for Cat B
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Card>
          <CardContent>
            <Typography variant="h6">catB</Typography>
          </CardContent>
          <CardMedia src="https://cdn2.thecatapi.com/images/5vk.jpg">
            <img
              className={classes.media}
              alt="CatPicture"
              src="https://cdn2.thecatapi.com/images/5vk.jpg"
            />
          </CardMedia>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(CatRating);
