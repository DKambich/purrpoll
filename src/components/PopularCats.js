import React, { Component, Fragment } from "react";
import { Grid, withStyles } from "@material-ui/core";
import CatLoading from "./CatLoading";
import CatCard from "./CatCard";

const styles = theme => {
  return {
    loadingIcon: {
      marginTop: theme.spacing.unit * 4
    }
  };
};

class PopularCats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: true,
      loading: true,
      popularCats: []
    };

    this.renderCats = this.renderCats.bind(this);
    this.getPopularCats = this.getPopularCats.bind(this);
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {this.renderCats()}
      </Grid>
    );
  }

  renderCats() {
    if (this.state.popularCats.length === 0) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <CatLoading />
        </div>
      );
    }

    return (
      <Fragment>
        {this.state.popularCats.map(({ id, name, image, totalVotes }) => (
          <CatCard key={id} title={name} src={image} rating={totalVotes} />
        ))}
      </Fragment>
    );
  }

  async getPopularCats() {
    let res = await fetch(
      "https://us-central1-purrpoll.cloudfunctions.net/getTopRatedCats",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    res = await res.json();
    if (res.status === "success" && this.state.mounted)
      this.setState({ loading: false, popularCats: res.topCats });
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.getPopularCats();
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }
}

export default withStyles(styles)(PopularCats);
