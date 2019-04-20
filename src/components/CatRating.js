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
      padding: theme.spacing.unit * 4,
      margin: theme.spacing.unit * 2
    },
    media: {
      height: 300,
      width: 300,
      objectFit: "cover"
    },
    voteText: { marginBottom: theme.spacing.unit * 2 }
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
        justify="center"
        alignItems="center"
        className={classes.mainCard}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">catA</Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image="https://cdn2.thecatapi.com/images/5ek.jpg"
            title="CAT A"
          />
        </Card>

        <Paper className={classes.votingCard}>
          <Grid container direction="column">
            <Typography
              variant="h4"
              align="center"
              className={classes.voteText}
            >
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
          <CardMedia
            className={classes.media}
            image="https://cdn2.thecatapi.com/images/5vk.jpg"
            title="CAT B"
          />
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(CatRating);
