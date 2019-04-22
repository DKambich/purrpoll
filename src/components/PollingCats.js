import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
// Local Imports
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

class PollingCats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
      loading: true,
      mounted: true,
      cats: [],
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
    } else if (this.state.empty) {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.loadingIcon}
        >
          <Typography variant="body1">
            No more cats to rate, check back tomorrow for more!
          </Typography>
        </Grid>
      );
    }

    let catA = this.state.cats[0],
      catB = this.state.cats[1];
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
                  this.voteForCat(0);
                }}
              >
                {catA.name}
              </Button>
              <Button
                variant="contained"
                className={classes.voteButton}
                disabled={this.state.voted}
                onClick={() => {
                  this.voteForCat(1);
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
    if (stats.votes === 0) {
      response = `You're the first person to vote for ${stats.name}`;
    } else {
      let percent = (stats.votes / stats.totalVotes) * 100;
      response = `You and ${percent}% of people voted for ${stats.name}`;
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

  async voteForCat(index) {
    let cat = this.state.cats[index];
    if (this.state.mounted)
      this.setState({
        voted: true,
        stats: {
          name: cat.name,
          totalVotes: cat.totalVotes,
          votes: cat.votes
        }
      });
    await fetch("https://us-central1-purrpoll.cloudfunctions.net/rateCat", {
      method: "post",
      body: await JSON.stringify({
        uid: this.state.user.uid,
        pairIndex: cat.index,
        catPicked: cat.string
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async getPair() {
    if (this.state.mounted) this.setState({ loading: true, voted: false });
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
      let pair = res.Pair;
      let cats = [
        {
          ...pair.catA,
          index: pair.index,
          votes: pair.votesForCatA,
          totalVotes: pair.totalVotes,
          string: "catA"
        },
        {
          ...pair.catB,
          index: pair.index,
          votes: pair.votesForCatB,
          totalVotes: pair.totalVotes,
          string: "catB"
        }
      ];
      if (this.state.mounted)
        this.setState({
          loading: false,
          cats: cats,
          empty: false
        });
    } else if (res.status === "empty") {
      if (this.state.mounted) this.setState({ loading: false, empty: true });
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

export default withStyles(styles)(PollingCats);
