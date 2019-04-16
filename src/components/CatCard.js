import React, { Component } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "inline-block",
    width: 300,
    margin: theme.spacing.unit * 3
  },
  media: {
    width: 300,
    height: 300,
    objectFit: "cover"
  },
  rating: {
    margin: theme.spacing.unit
  }
});

class CatCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6">{this.props.title}</Typography>
        </CardContent>
        <CardMedia>
          <img
            className={classes.media}
            alt="CatPicture"
            src={this.props.src}
          />
        </CardMedia>
        <Typography color="textSecondary" className={classes.rating}>
          {`Total Votes: ${this.props.rating}`}
        </Typography>
      </Card>
    );
  }
}

export default withStyles(styles)(CatCard);
