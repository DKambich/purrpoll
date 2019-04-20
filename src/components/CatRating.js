import React, { Component, Fragment } from "react";

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
    voteText: { marginBottom: theme.spacing.unit * 2 },
    voteButton: { margin: theme.spacing.unit }
  };
};

class CatRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      loading: true,
      mounted: true,
      pair: null,
      stats: null,
      user: props.user,
      voted: false
    };

    this.voteForCat = this.voteForCat.bind(this);
    this.getPair = this.getPair.bind(this);
    this.renderStats = this.renderStats.bind(this);
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

    const { catA, catB, votesForCatA, votesForCatB } = this.state.pair;

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
            <Typography variant="h6">{catA.name}</Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={catA.image}
            title={catA.name}
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
              <Button
                variant="contained"
                className={classes.voteButton}
                disabled={this.state.voted}
                onClick={() => {
                  this.voteForCat(catA, votesForCatA, "catA");
                }}
              >
                {catA.name}
              </Button>
              <Button
                variant="contained"
                className={classes.voteButton}
                disabled={this.state.voted}
                onClick={() => {
                  this.voteForCat(catB, votesForCatB, "catB");
                }}
              >
                {catB.name}
              </Button>
            </Grid>
            {this.renderStats()}
          </Grid>
        </Paper>

        <Card>
          <CardContent>
            <Typography variant="h6">{catB.name}</Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={catB.image}
            title={catB.name}
          />
        </Card>
      </Grid>
    );
  }

  renderStats() {
    if (!this.state.voted) return null;
    let { stats } = this.state;
    let response;
    if (stats.totalVotes === 0) {
      response = `You're the first person to vote for ${stats.cat.name}`;
    } else {
      let percent = stats.votes / stats.totalVotes;
      response = `You and ${percent}% of people voted for ${stats.cat.name}`;
    }
    return (
      <Fragment>
        <Typography variant="body1" align="center">
          {response}
        </Typography>
        <Button variant="contained" onClick={this.getPair}>
          Next Pair
        </Button>
      </Fragment>
    );
  }

  async voteForCat(cat, catVotes, catStr) {
    await fetch("https://us-central1-purrpoll.cloudfunctions.net/rateCat", {
      method: "post",
      body: await JSON.stringify({
        uid: this.state.user.uid,
        pairIndex: this.state.pair.index,
        catPicked: catStr
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (this.state.mounted)
      this.setState({
        voted: true,
        stats: {
          cat: cat,
          totalVotes: this.state.pair.totalVotes,
          votes: catVotes
        }
      });
  }

  async getPair() {
    if (this.state.mounted) this.setState({ loading: true });
    let res = await fetch(
      "https://us-central1-purrpoll.cloudfunctions.net/getNextCats",
      {
        method: "post",
        body: await JSON.stringify({ uid: this.state.user.uid }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    res = await res.json();
    if (res.status === "success") {
      if (this.state.mounted) this.setState({ loading: false, pair: res.Pair });
    } else if (res.status === "empty") {
      if (this.state.mounted) this.setState({ empty: true });
    }
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.getPair();
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }
}

export default withStyles(styles)(CatRating);
